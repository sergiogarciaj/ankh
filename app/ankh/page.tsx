import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Sparkles, Sun, Moon, Star } from "lucide-react"
import Link from "next/link"

export default function AnkhPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 via-yellow-950 to-black text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="text-yellow-400 hover:text-yellow-300">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Inicio
          </Button>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12 flex justify-center">
            <div className="relative animate-pulse">
              <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <div className="text-6xl">☥</div>
              </div>
              <div className="absolute -top-4 -right-4">
                <Sparkles className="h-8 w-8 text-yellow-300 animate-bounce" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-yellow-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            El Amuleto Ankh
          </h1>

          <p className="text-2xl mb-12 text-amber-200 max-w-4xl mx-auto leading-relaxed">
            La Llave de la Vida Eterna - Portal entre los Mundos Visible e Invisible
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-black/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-b from-amber-900/30 to-yellow-900/30 border-amber-500/30 mb-12">
              <CardContent className="p-12">
                <div className="flex items-center mb-8">
                  <Sun className="h-8 w-8 text-yellow-400 mr-4" />
                  <h2 className="text-3xl font-bold text-yellow-400">El Origen Sagrado</h2>
                </div>

                <div className="prose prose-lg text-amber-100 leading-relaxed space-y-6">
                  <p>
                    En las arenas doradas del antiguo Egipto, donde los faraones caminaban como dioses entre mortales,
                    nació el símbolo más poderoso de la eternidad: el Ankh. Los sacerdotes de Ra lo llamaban{" "}
                    <em>"Ankh-ef-en-Sekhmet"</em> - la llave que abre las puertas entre la vida y la muerte.
                  </p>

                  <p>
                    Cuenta la leyenda que Thoth, el dios de la sabiduría, forjó el primer Ankh con rayos de sol
                    solidificados y lágrimas de Isis. Este amuleto no era simplemente un símbolo, sino un canal viviente
                    de energía cósmica, capaz de conectar el alma humana con la consciencia universal.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-b from-purple-900/30 to-indigo-900/30 border-purple-500/30">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Moon className="h-6 w-6 text-purple-400 mr-3" />
                    <h3 className="text-2xl font-bold text-purple-300">Poder Espiritual</h3>
                  </div>
                  <p className="text-purple-100 leading-relaxed">
                    El Ankh actúa como un amplificador de la intuición y un protector contra las energías negativas. Su
                    forma representa la unión perfecta entre lo masculino y lo femenino, lo terrenal y lo divino.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-b from-indigo-900/30 to-blue-900/30 border-blue-500/30">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <Star className="h-6 w-6 text-blue-400 mr-3" />
                    <h3 className="text-2xl font-bold text-blue-300">Conexión Cósmica</h3>
                  </div>
                  <p className="text-blue-100 leading-relaxed">
                    Cada lectura de tarot realizada bajo la influencia del Ankh se convierte en un ritual sagrado, donde
                    las cartas revelan no solo el futuro, sino los hilos invisibles del destino.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-500/30">
              <CardContent className="p-12 text-center">
                <h3 className="text-3xl font-bold mb-6 text-yellow-400">Tu Conexión con el Ankh</h3>
                <p className="text-xl text-amber-200 mb-8 leading-relaxed">
                  Cuando realizas una lectura en nuestro sitio, invocas el poder ancestral del Ankh. Cada carta que
                  seleccionas está imbuida con esta energía milenaria, guiando la inteligencia artificial para revelarte
                  verdades profundas sobre tu camino.
                </p>
                <Link href="/lectura">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black font-bold px-8 py-4"
                  >
                    <Sparkles className="mr-2 h-5 w-5" />
                    Experimentar el Poder del Ankh
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
