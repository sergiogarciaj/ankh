"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Briefcase, Activity, Sparkles, Moon, Star } from "lucide-react"
import Link from "next/link"

const tiposLectura = [
  {
    id: "amor",
    titulo: "Amor y Relaciones",
    descripcion: "Descubre los secretos de tu corazón y las energías que rodean tus relaciones",
    icono: Heart,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "trabajo",
    titulo: "Carrera y Abundancia",
    descripcion: "Ilumina tu camino profesional y las oportunidades que te esperan",
    icono: Briefcase,
    color: "from-green-500 to-emerald-500",
  },
  {
    id: "salud",
    titulo: "Bienestar y Vitalidad",
    descripcion: "Conecta con tu energía vital y encuentra equilibrio en cuerpo y mente",
    icono: Activity,
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: "espiritual",
    titulo: "Crecimiento Espiritual",
    descripcion: "Explora tu propósito superior y la evolución de tu alma",
    icono: Sparkles,
    color: "from-purple-500 to-violet-500",
  },
]

export default function LecturaPage() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState<string | null>(null)
  const [mostrarCartas, setMostrarCartas] = useState(false)

  const iniciarLectura = (tipo: string) => {
    setTipoSeleccionado(tipo)
    setMostrarCartas(true)
  }

  if (mostrarCartas) {
    return <TiradaCartas tipo={tipoSeleccionado!} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <Moon className="h-16 w-16 text-purple-400 animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Elige tu Consulta Sagrada
          </h1>

          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-12">
            Cada tipo de lectura está diseñado para revelar aspectos específicos de tu destino. Permite que tu intuición
            te guíe hacia la consulta que tu alma necesita.
          </p>
        </div>
      </section>

      {/* Tipos de Lectura */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tiposLectura.map((tipo) => {
              const IconComponent = tipo.icono
              return (
                <Card
                  key={tipo.id}
                  className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 cursor-pointer group"
                  onClick={() => iniciarLectura(tipo.id)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mb-4 flex justify-center">
                      <div
                        className={`p-4 rounded-full bg-gradient-to-r ${tipo.color} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-purple-300 transition-colors">
                      {tipo.titulo}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-purple-200 mb-6 leading-relaxed">{tipo.descripcion}</p>
                    <Button
                      className={`bg-gradient-to-r ${tipo.color} hover:opacity-90 text-white font-semibold px-6 py-2`}
                    >
                      Comenzar Lectura
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Información adicional */}
      <section className="py-16 bg-black/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Star className="h-12 w-12 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Cómo Funciona tu Lectura Mística</h2>
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="text-center">
                <Badge variant="outline" className="border-purple-400 text-purple-300 mb-4">
                  Paso 1
                </Badge>
                <h3 className="text-xl font-semibold mb-3 text-white">Selecciona 4 Cartas</h3>
                <p className="text-purple-200">
                  Deja que tu intuición te guíe para elegir las cartas que resonarán con tu energía
                </p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="border-purple-400 text-purple-300 mb-4">
                  Paso 2
                </Badge>
                <h3 className="text-xl font-semibold mb-3 text-white">Revelación Gradual</h3>
                <p className="text-purple-200">
                  Las cartas se revelarán una a una, creando una narrativa única para ti
                </p>
              </div>
              <div className="text-center">
                <Badge variant="outline" className="border-purple-400 text-purple-300 mb-4">
                  Paso 3
                </Badge>
                <h3 className="text-xl font-semibold mb-3 text-white">Interpretación IA</h3>
                <p className="text-purple-200">
                  Nuestra IA mística interpretará el mensaje oculto en tu combinación de cartas
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function TiradaCartas({ tipo }: { tipo: string }) {
  const [cartasSeleccionadas, setCartasSeleccionadas] = useState<number[]>([])
  const [cartasReveladas, setCartasReveladas] = useState<number[]>([])
  const [interpretacion, setInterpretacion] = useState<string>("")
  const [cargando, setCargando] = useState(false)

  const cartas = Array.from({ length: 20 }, (_, i) => i + 1)

  const seleccionarCarta = (index: number) => {
    if (cartasSeleccionadas.length < 4 && !cartasSeleccionadas.includes(index)) {
      const nuevasCartas = [...cartasSeleccionadas, index]
      setCartasSeleccionadas(nuevasCartas)

      if (nuevasCartas.length === 4) {
        revelarCartas(nuevasCartas)
      }
    }
  }

  const revelarCartas = async (cartas: number[]) => {
    setCargando(true)

    // Revelar cartas una por una
    for (let i = 0; i < cartas.length; i++) {
      setTimeout(() => {
        setCartasReveladas((prev) => [...prev, cartas[i]])
      }, i * 1000)
    }

    // Generar interpretación después de revelar todas las cartas
    setTimeout(async () => {
      await generarInterpretacion(cartas, tipo)
      setCargando(false)
    }, 4500)
  }

  const generarInterpretacion = async (cartas: number[], tipoLectura: string) => {
    try {
      const response = await fetch("/api/interpretar-tarot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartas: cartas,
          tipo: tipoLectura,
        }),
      })

      const data = await response.json()
      setInterpretacion(data.interpretacion)
    } catch (error) {
      console.error("Error al generar interpretación:", error)
      setInterpretacion(
        "Las energías cósmicas están alineándose para revelarte un mensaje profundo. Tu selección de cartas indica un momento de transformación y crecimiento espiritual en tu camino.",
      )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-purple-950 to-black text-white p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tu Lectura Mística
          </h1>
          <p className="text-purple-200">
            {cartasSeleccionadas.length < 4
              ? `Selecciona ${4 - cartasSeleccionadas.length} carta${4 - cartasSeleccionadas.length > 1 ? "s" : ""} más`
              : "Revelando tu destino..."}
          </p>
        </div>

        {/* Grid de cartas */}
        <div className="grid grid-cols-5 md:grid-cols-10 gap-4 mb-12">
          {cartas.map((carta, index) => (
            <div
              key={index}
              className={`aspect-[2/3] rounded-lg cursor-pointer transition-all duration-500 ${
                cartasSeleccionadas.includes(index)
                  ? cartasReveladas.includes(index)
                    ? "bg-gradient-to-b from-yellow-400 to-amber-500 transform scale-110"
                    : "bg-gradient-to-b from-purple-600 to-indigo-600 transform scale-105"
                  : "bg-gradient-to-b from-gray-700 to-gray-900 hover:scale-105"
              }`}
              onClick={() => seleccionarCarta(index)}
            >
              <div className="w-full h-full flex items-center justify-center text-2xl">
                {cartasReveladas.includes(index) ? "🌟" : "🌙"}
              </div>
            </div>
          ))}
        </div>

        {/* Cartas seleccionadas */}
        {cartasSeleccionadas.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-6 text-yellow-400">Tus Cartas Elegidas</h2>
            <div className="flex justify-center gap-4 flex-wrap">
              {cartasSeleccionadas.map((carta, index) => (
                <div
                  key={carta}
                  className={`w-24 h-36 rounded-lg transition-all duration-1000 ${
                    cartasReveladas.includes(carta)
                      ? "bg-gradient-to-b from-yellow-400 to-amber-500"
                      : "bg-gradient-to-b from-purple-600 to-indigo-600"
                  }`}
                >
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    {cartasReveladas.includes(carta) ? "✨" : "🌙"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Interpretación */}
        {(interpretacion || cargando) && (
          <Card className="bg-gradient-to-b from-purple-900/50 to-indigo-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-yellow-400">Tu Mensaje Cósmico</CardTitle>
            </CardHeader>
            <CardContent>
              {cargando ? (
                <div className="text-center py-8">
                  <Sparkles className="h-8 w-8 text-purple-400 animate-spin mx-auto mb-4" />
                  <p className="text-purple-200">Las energías cósmicas están revelando tu mensaje...</p>
                </div>
              ) : (
                <div className="prose prose-lg text-purple-100 max-w-none">
                  <p className="leading-relaxed text-lg">{interpretacion}</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {interpretacion && (
          <div className="text-center mt-8">
            <Link href="/lectura">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 mr-4">
                Nueva Lectura
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
              >
                Volver al Inicio
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
