import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Moon, Star, Eye } from "lucide-react"
import Link from "next/link"
import { AuthButton } from "@/components/auth/auth-button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white">
      {/* Header/Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-purple-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-purple-300 bg-clip-text text-transparent">
                Tarot Místico IA
              </span>
            </Link>
            <AuthButton />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] bg-cover bg-center opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <Sparkles className="h-16 w-16 text-yellow-400 animate-pulse" />
              <div className="absolute -top-2 -right-2">
                <Star className="h-6 w-6 text-purple-300 animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            Tarot Místico IA
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-purple-200 max-w-3xl mx-auto leading-relaxed">
            Descubre los secretos del universo a través de lecturas de tarot personalizadas, guiadas por la sabiduría
            ancestral y la inteligencia artificial
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/lectura">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg"
              >
                <Moon className="mr-2 h-5 w-5" />
                Comenzar Lectura
              </Button>
            </Link>
            <Link href="/ankh">
              <Button
                variant="outline"
                size="lg"
                className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black px-8 py-4 text-lg bg-transparent"
              >
                <Eye className="mr-2 h-5 w-5" />
                El Poder del Ankh
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-yellow-400">Experiencia Mística Personalizada</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-b from-purple-900/50 to-indigo-900/50 border-purple-500/30">
              <CardContent className="p-8 text-center">
                <Sparkles className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Lecturas IA</h3>
                <p className="text-purple-200">
                  Interpretaciones profundas y personalizadas generadas por inteligencia artificial entrenada en
                  sabiduría esotérica milenaria
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-indigo-900/50 to-purple-900/50 border-indigo-500/30">
              <CardContent className="p-8 text-center">
                <Moon className="h-12 w-12 text-purple-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Múltiples Tiradas</h3>
                <p className="text-purple-200">
                  Consultas especializadas para amor, trabajo, salud y crecimiento espiritual. Cada lectura adaptada a
                  tu necesidad
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-b from-purple-900/50 to-pink-900/50 border-pink-500/30">
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-pink-300 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4 text-white">Objetos Sagrados</h3>
                <p className="text-purple-200">
                  Amuletos, cristales y herramientas místicas cargadas de energía para potenciar tu conexión espiritual
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-indigo-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">¿Lista para descubrir tu destino?</h2>
          <p className="text-xl mb-8 text-purple-200 max-w-2xl mx-auto">
            Únete a miles de personas que han encontrado claridad y propósito a través de nuestras lecturas místicas
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
              Crear Cuenta Gratuita
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
