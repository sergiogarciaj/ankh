/**
 * Sistema de Rate Limiting en memoria
 * NOTA: Para producción con múltiples instancias, usar Redis
 */

interface RateLimitRecord {
  count: number
  resetAt: number
}

// Map para almacenar intentos por IP
const rateLimitMap = new Map<string, RateLimitRecord>()

// Limpieza periódica de registros expirados (cada 5 minutos)
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now > record.resetAt) {
        rateLimitMap.delete(ip)
      }
    }
  }, 5 * 60 * 1000)
}

/**
 * Verifica si una IP ha excedido el límite de requests
 * @param identifier - IP o identificador único del cliente
 * @param maxRequests - Número máximo de requests permitidos
 * @param windowMs - Ventana de tiempo en milisegundos
 * @returns true si está dentro del límite, false si ha excedido
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): boolean {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  // Si no hay registro o ya expiró, crear uno nuevo
  if (!record || now > record.resetAt) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetAt: now + windowMs,
    })
    return true
  }

  // Si ya excedió el límite
  if (record.count >= maxRequests) {
    return false
  }

  // Incrementar contador
  record.count++
  return true
}

/**
 * Obtiene información sobre el rate limit actual de un identificador
 */
export function getRateLimitInfo(identifier: string): {
  remaining: number
  resetAt: number | null
} {
  const record = rateLimitMap.get(identifier)

  if (!record) {
    return { remaining: 10, resetAt: null }
  }

  return {
    remaining: Math.max(0, 10 - record.count),
    resetAt: record.resetAt,
  }
}

/**
 * Resetea el rate limit de un identificador (útil para testing)
 */
export function resetRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier)
}

/**
 * Extrae la IP del cliente de los headers de la request
 */
export function getClientIP(request: Request): string {
  // Priorizar headers de proxies (Vercel, Cloudflare, etc.)
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback para desarrollo local
  return 'unknown'
}
