/**
 * Sistema de logging estructurado para la aplicación
 * En producción, considerar integrar con servicios como:
 * - Sentry (errores)
 * - Datadog (logs)
 * - LogRocket (sesiones de usuario)
 */

export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

interface LogMetadata {
  [key: string]: any
}

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  metadata?: LogMetadata
  error?: {
    message: string
    stack?: string
    name?: string
  }
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'

  /**
   * Formatea y emite un log estructurado
   */
  private log(level: LogLevel, message: string, metadata?: LogMetadata, error?: Error): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      ...(metadata && { metadata }),
      ...(error && {
        error: {
          name: error.name,
          message: error.message,
          stack: this.isDevelopment ? error.stack : undefined,
        },
      }),
    }

    // En desarrollo, mostrar logs más legibles
    if (this.isDevelopment) {
      const emoji = this.getEmoji(level)
      console.log(`${emoji} [${level.toUpperCase()}]`, message, metadata || '', error || '')
    } else {
      // En producción, logs en formato JSON para parseo automático
      const logMethod = level === LogLevel.ERROR ? console.error : console.log
      logMethod(JSON.stringify(entry))
    }
  }

  private getEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return '🔍'
      case LogLevel.INFO:
        return 'ℹ️'
      case LogLevel.WARN:
        return '⚠️'
      case LogLevel.ERROR:
        return '❌'
      default:
        return '📝'
    }
  }

  /**
   * Log de nivel DEBUG - información detallada para debugging
   */
  debug(message: string, metadata?: LogMetadata): void {
    if (this.isDevelopment) {
      this.log(LogLevel.DEBUG, message, metadata)
    }
  }

  /**
   * Log de nivel INFO - eventos importantes de la aplicación
   */
  info(message: string, metadata?: LogMetadata): void {
    this.log(LogLevel.INFO, message, metadata)
  }

  /**
   * Log de nivel WARN - advertencias que no son errores críticos
   */
  warn(message: string, metadata?: LogMetadata): void {
    this.log(LogLevel.WARN, message, metadata)
  }

  /**
   * Log de nivel ERROR - errores que requieren atención
   */
  error(message: string, error?: Error, metadata?: LogMetadata): void {
    this.log(LogLevel.ERROR, message, metadata, error)
  }

  /**
   * Log específico para eventos de autenticación
   */
  auth(event: 'login' | 'logout' | 'register' | 'failed', userId?: string, metadata?: LogMetadata): void {
    this.info(`[AUTH] ${event}`, {
      event,
      userId: userId || 'anonymous',
      ...metadata,
    })
  }

  /**
   * Log específico para llamadas a API
   */
  api(method: string, path: string, status: number, duration?: number, metadata?: LogMetadata): void {
    const level = status >= 500 ? LogLevel.ERROR : status >= 400 ? LogLevel.WARN : LogLevel.INFO

    this.log(level, `[API] ${method} ${path} - ${status}`, {
      method,
      path,
      status,
      ...(duration && { duration: `${duration}ms` }),
      ...metadata,
    })
  }

  /**
   * Log específico para eventos de seguridad
   */
  security(event: string, severity: 'low' | 'medium' | 'high' | 'critical', metadata?: LogMetadata): void {
    const level = severity === 'critical' || severity === 'high' ? LogLevel.ERROR : LogLevel.WARN

    this.log(level, `[SECURITY] ${event}`, {
      event,
      severity,
      ...metadata,
    })
  }
}

// Exportar instancia singleton
export const logger = new Logger()
