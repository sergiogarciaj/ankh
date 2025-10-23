import { z } from 'zod'

/**
 * Schema de validación para la interpretación de tarot
 * - cartas: Array de exactamente 4 números entre 0-19 (índices del mazo)
 * - tipo: Uno de los 4 tipos de lectura disponibles
 */
export const interpretarTarotSchema = z.object({
  cartas: z
    .array(z.number().int().min(0).max(19))
    .length(4, 'Debes seleccionar exactamente 4 cartas')
    .refine((arr) => new Set(arr).size === arr.length, {
      message: 'Las cartas deben ser únicas',
    }),
  tipo: z.enum(['amor', 'trabajo', 'salud', 'espiritual'], {
    errorMap: () => ({ message: 'Tipo de lectura inválido' }),
  }),
})

export type InterpretarTarotInput = z.infer<typeof interpretarTarotSchema>
