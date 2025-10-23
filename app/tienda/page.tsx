import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Star, Sparkles } from "lucide-react"
import Link from "next/link"

const productos = [
  {
    id: 1,
    nombre: "Amuleto Ankh Dorado",
    precio: 89.99,
    imagen: "/placeholder.svg?height=300&width=300",
    descripcion: "Amuleto sagrado egipcio forjado en oro de 18k, cargado con energías de protección y vida eterna.",
    categoria: "Amuletos",
    rating: 5,
  },
  {
    id: 2,
    nombre: "Baraja Tarot Místico",
    precio: 45.99,
    imagen: "/placeholder.svg?height=300&width=300",
    descripcion: "Baraja completa de 78 cartas con ilustraciones originales inspiradas en la tradición egipcia.",
    categoria: "Cartas",
    rating: 5,
  },
  {
    id: 3,
    nombre: "Cristal de Amatista",
    precio: 34.99,
    imagen: "/placeholder.svg?height=300&width=300",
    descripcion: "Cristal natural de amatista para meditación y amplificación de la intuición espiritual.",
    categoria: "Cristales",
    rating: 4,
  },
  {
    id: 4,
    nombre: "Vela Ritual Violeta",
    precio: 19.99,
    imagen: "/placeholder.svg?height=300&width=300",
    descripcion: "Vela artesanal infusionada con aceites esenciales para rituales de protección y claridad.",
    categoria: "Velas",
    rating: 5,
  },
  {
    id: 5,
    nombre: "Péndulo de Cuarzo Rosa",
    precio: 28.99,
    imagen: "/placeholder.svg?height=300&width=300",
    descripcion: "Péndulo de cuarzo rosa para radiestesia y consultas sobre temas del corazón.",
    categoria: "Herramientas",
    rating: 4,
  },
  {
    id: 6,
    nombre: "Incienso Sagrado Set",
    precio: 24.99,
    imagen: "/placeholder.svg?height=300&width=300",
    descripcion: "Colección de inciensos naturales: sándalo, mirra y copal para purificación energética.",
    categoria: "Inciensos",
    rating: 5,
  },
]

const categorias = ["Todos", "Amuletos", "Cartas", "Cristales", "Velas", "Herramientas", "Inciensos"]

export default function TiendaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
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
            <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Tienda Mística
          </h1>

          <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-8">
            Objetos sagrados cargados de energía ancestral para potenciar tu conexión espiritual y acompañarte en tu
            camino de autoconocimiento
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section className="py-8 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categorias.map((categoria) => (
              <Badge
                key={categoria}
                variant="outline"
                className="border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white cursor-pointer px-4 py-2"
              >
                {categoria}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Productos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((producto) => (
              <Card
                key={producto.id}
                className="bg-gradient-to-b from-purple-900/30 to-indigo-900/30 border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 group"
              >
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={producto.imagen || "/placeholder.svg"}
                      alt={producto.nombre}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-500 text-black">{producto.categoria}</Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="flex items-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < producto.rating ? "text-yellow-400 fill-current" : "text-gray-400"}`}
                      />
                    ))}
                  </div>

                  <CardTitle className="text-xl text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {producto.nombre}
                  </CardTitle>

                  <p className="text-purple-200 text-sm mb-4 leading-relaxed">{producto.descripcion}</p>

                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-yellow-400">${producto.precio}</span>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">¿Necesitas ayuda para elegir?</h2>
          <p className="text-xl mb-8 text-purple-200 max-w-2xl mx-auto">
            Nuestros expertos en energías místicas pueden guiarte hacia los objetos que mejor resonarán con tu aura y
            propósito espiritual
          </p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4">
            Consulta Personalizada Gratuita
          </Button>
        </div>
      </section>
    </div>
  )
}
