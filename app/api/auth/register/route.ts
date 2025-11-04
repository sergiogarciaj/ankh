import { NextResponse } from 'next/server'
import { z } from 'zod'
import { createUser } from '@/lib/auth/users'
import { handleAPIError, ValidationError } from '@/lib/middleware/error-handler'
import { checkRateLimit, getClientIP } from '@/lib/middleware/rate-limit'
import { logger } from '@/lib/utils/logger'

// Force Node.js runtime to support crypto module
export const runtime = 'nodejs'

// Validación del registro
const registerSchema = z.object({
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[a-z]/, 'Debe contener al menos una minúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
})

export async function POST(request: Request) {
  const startTime = Date.now()

  try {
    // 1. RATE LIMITING: Prevenir spam de registros
    const clientIP = getClientIP(request)
    const isAllowed = checkRateLimit(
      `register:${clientIP}`,
      3, // 3 intentos
      15 * 60 * 1000 // 15 minutos
    )

    if (!isAllowed) {
      logger.security('Rate limit excedido en registro', 'low', {
        ip: clientIP,
      })
      throw new ValidationError('Demasiados intentos. Intenta en 15 minutos.')
    }

    // 2. VALIDACIÓN: Validar datos del formulario
    const body = await request.json()
    const { name, email, password } = registerSchema.parse(body)

    logger.info('Intento de registro', {
      email,
      ip: clientIP,
    })

    // 3. CREAR USUARIO
    const user = await createUser({
      name,
      email,
      password,
    })

    logger.info('Usuario registrado exitosamente', {
      userId: user.id,
      email: user.email,
    })

    const duration = Date.now() - startTime
    logger.api('POST', '/api/auth/register', 201, duration, {
      userId: user.id,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Usuario registrado exitosamente',
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    const duration = Date.now() - startTime
    logger.api('POST', '/api/auth/register', 400, duration)

    return handleAPIError(error)
  }
}
