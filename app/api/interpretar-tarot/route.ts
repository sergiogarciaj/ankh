import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

const cartasTarot = [
  "El Loco",
  "El Mago",
  "La Sacerdotisa",
  "La Emperatriz",
  "El Emperador",
  "El Hierofante",
  "Los Enamorados",
  "El Carro",
  "La Justicia",
  "El Ermitaño",
  "La Rueda de la Fortuna",
  "La Fuerza",
  "El Colgado",
  "La Muerte",
  "La Templanza",
  "El Diablo",
  "La Torre",
  "La Estrella",
  "La Luna",
  "El Sol",
]

export async function POST(request: Request) {
  try {
    const { cartas, tipo } = await request.json()

    const cartasSeleccionadas = cartas.map((index: number) => cartasTarot[index % cartasTarot.length])

    const tipoDescripcion = {
      amor: "amor y relaciones",
      trabajo: "carrera y abundancia profesional",
      salud: "bienestar y vitalidad",
      espiritual: "crecimiento espiritual y propósito superior",
    }

    const prompt = `Eres una sabia tarotista con conocimiento ancestral egipcio y conexión con las energías del amuleto Ankh. 

Las cartas seleccionadas son: ${cartasSeleccionadas.join(", ")}
Tipo de consulta: ${tipoDescripcion[tipo as keyof typeof tipoDescripcion]}

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
      model: openai("gpt-4o"),
      prompt: prompt,
      temperature: 0.8,
    })

    return Response.json({ interpretacion: text })
  } catch (error) {
    console.error("Error generating interpretation:", error)
    return Response.json({ error: "Error al generar la interpretación" }, { status: 500 })
  }
}
