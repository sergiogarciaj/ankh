import { generateText } from 'ai'
import { openai } from '@ai-sdk/openai'
import { auth } from '@/auth'
import { interpretarTarotSchema } from '@/lib/validations/tarot'
import { checkRateLimit, getClientIP } from '@/lib/middleware/rate-limit'
import { handleAPIError, AuthenticationError, RateLimitError } from '@/lib/middleware/error-handler'
import { logger } from '@/lib/utils/logger'

const cartasTarot = [
  'El Loco',
  'El Mago',
  'La Sacerdotisa',
  'La Emperatriz',
  'El Emperador',
  'El Hierofante',
  'Los Enamorados',
  'El Carro',
  'La Justicia',
  'El Ermitaño',
  'La Rueda de la Fortuna',
  'La Fuerza',
  'El Colgado',
  'La Muerte',
  'La Templanza',
  'El Diablo',
  'La Torre',
  'La Estrella',
  'La Luna',
  'El Sol',
]

const tipoDescripcion = {
  amor: 'amor y relaciones',
  trabajo: 'carrera y abundancia profesional',
  salud: 'bienestar y vitalidad',
  espiritual: 'crecimiento espiritual y propósito superior',
} as const

/**
 * POST /api/interpretar-tarot
 * Genera una interpretación de tarot usando GPT-4o
 *
 * Seguridad:
 * - Requiere autenticación
 * - Rate limit: 5 requests por 5 minutos
 * - Validación estricta de inputs con Zod
 */
export async function POST(request: Request) {
  const startTime = Date.now()

  try {
    // 1. AUTENTICACIÓN: Verificar que el usuario esté autenticado
    const session = await auth()
    if (!session?.user) {
      logger.security('Intento de acceso no autorizado a API de tarot', 'medium', {
        endpoint: '/api/interpretar-tarot',
      })
      throw new AuthenticationError('Debes iniciar sesión para usar el tarot')
    }

    const userId = session.user.id
    const userEmail = session.user.email

    // 2. RATE LIMITING: Prevenir abuso del servicio de IA
    const clientIP = getClientIP(request)
    const isAllowed = checkRateLimit(
      `tarot:${userId}:${clientIP}`,
      5, // 5 requests
      5 * 60 * 1000 // 5 minutos
    )

    if (!isAllowed) {
      logger.security('Rate limit excedido en API de tarot', 'low', {
        userId,
        userEmail,
        ip: clientIP,
      })
      throw new RateLimitError('Has alcanzado el límite de lecturas. Intenta en 5 minutos.')
    }

    // 3. VALIDACIÓN: Validar inputs con Zod
    const body = await request.json()
    const { cartas, tipo } = interpretarTarotSchema.parse(body)

    logger.info('Generando interpretación de tarot', {
      userId,
      userEmail,
      tipo,
      cartasCount: cartas.length,
    })

    // 4. PROCESAMIENTO: Mapear índices a nombres de cartas
    const cartasSeleccionadas = cartas.map((index) => cartasTarot[index])

    // 5. IA: Generar interpretación con GPT-4o
    const prompt = `Eres una sabia tarotista con conocimiento ancestral egipcio y conexión con las energías del amuleto Ankh.

Las cartas seleccionadas son: ${cartasSeleccionadas.join(', ')}
Tipo de consulta: ${tipoDescripcion[tipo]}

Proporciona una interpretación mística y profunda que:
- Conecte las cartas entre sí de manera narrativa
- Use un lenguaje espiritual, inspirador y misterioso
- Incluya referencias sutiles a energías cósmicas y sabiduría ancestral
- Sea específica para el tipo de consulta
- Ofrezca guía práctica envuelta en misticismo
- Tenga entre 150-200 palabras
- Use un tono cercano pero sabio, como una guía espiritual

No menciones que eres una IA. Habla como una verdadera vidente conectada con las fuerzas universales.`

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: prompt,
      temperature: 0.8,
    })

    const duration = Date.now() - startTime
    logger.api('POST', '/api/interpretar-tarot', 200, duration, {
      userId,
      tipo,
      cartasCount: cartas.length,
      responseLength: text.length,
    })

    return Response.json({ interpretacion: text })
  } catch (error) {
    const duration = Date.now() - startTime
    logger.api('POST', '/api/interpretar-tarot', 500, duration)

    return handleAPIError(error)
  }
}
