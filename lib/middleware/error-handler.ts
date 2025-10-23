import { z } from 'zod'
import { logger } from '@/lib/utils/logger'

/**
 * Errores personalizados de la aplicación
 */

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, public details?: any) {
    super(message, 400, 'VALIDATION_ERROR')
    this.name = 'ValidationError'
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'No autorizado') {
    super(message, 401, 'AUTHENTICATION_ERROR')
    this.name = 'AuthenticationError'
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Demasiados intentos. Intenta más tarde.') {
    super(message, 429, 'RATE_LIMIT_ERROR')
    this.name = 'RateLimitError'
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super(message || `Error en servicio externo: ${service}`, 503, 'EXTERNAL_SERVICE_ERROR')
    this.name = 'ExternalServiceError'
  }
}

/**
 * Maneja errores de API y retorna respuestas apropiadas
 */
export function handleAPIError(error: unknown): Response {
  // Error de validación Zod
  if (error instanceof z.ZodError) {
    logger.warn('Validación fallida', { errors: error.errors })

    return Response.json(
      {
        error: 'Validación fallida',
        code: 'VALIDATION_ERROR',
        details: error.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      },
      { status: 400 }
    )
  }

  // Errores personalizados de la app
  if (error instanceof AppError) {
    logger.error(`${error.name}: ${error.message}`, error, {
      statusCode: error.statusCode,
      code: error.code,
    })

    const response: any = {
      error: error.message,
      code: error.code,
    }

    if (error instanceof ValidationError && error.details) {
      response.details = error.details
    }

    return Response.json(response, { status: error.statusCode })
  }

  // Error de OpenAI/Servicios externos
  if (error instanceof Error) {
    const errorMessage = error.message.toLowerCase()

    // Detectar errores de OpenAI
    if (
      errorMessage.includes('openai') ||
      errorMessage.includes('api key') ||
      errorMessage.includes('rate limit')
    ) {
      logger.error('Error en servicio de IA', error, { service: 'OpenAI' })

      return Response.json(
        {
          error: 'El servicio de interpretación está temporalmente no disponible',
          code: 'EXTERNAL_SERVICE_ERROR',
        },
        { status: 503 }
      )
    }

    // Otros errores conocidos
    logger.error('Error de aplicación', error)

    return Response.json(
      {
        error: 'Error procesando tu solicitud',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }

  // Error desconocido
  logger.error('Error desconocido', undefined, { error: String(error) })

  return Response.json(
    {
      error: 'Error interno del servidor',
      code: 'UNKNOWN_ERROR',
    },
    { status: 500 }
  )
}

/**
 * Wrapper para rutas de API con manejo de errores automático
 */
export function withErrorHandler(
  handler: (request: Request, context?: any) => Promise<Response>
) {
  return async (request: Request, context?: any): Promise<Response> => {
    try {
      return await handler(request, context)
    } catch (error) {
      return handleAPIError(error)
    }
  }
}
