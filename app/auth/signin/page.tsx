'use client';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"
import { FaGoogle, FaFacebook } from "react-icons/fa"
import { Moon, Sparkles } from "lucide-react"

export default function SignInPage() {
  const handleSignIn = (provider: string) => {
    // Obtener la URL actual para redirigir después del inicio de sesión
    const callbackUrl = window.location.pathname === '/auth/signin' ? '/' : window.location.href;
    
    signIn(provider, { 
      callbackUrl,
      redirect: true
    }).catch(error => {
      console.error('Error during sign in:', error);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Sparkles className="h-12 w-12 text-yellow-400 animate-pulse" />
              <div className="absolute -top-1 -right-1">
                <Moon className="h-5 w-5 text-purple-300" />
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Bienvenido a Tarot Místico IA</h1>
          <p className="text-purple-200">Inicia sesión para continuar</p>
        </div>

        <Card className="bg-gray-900/50 border-purple-900/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center text-purple-300">
              Elige tu método preferido
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={() => handleSignIn('authentik')}
              variant="outline"
              className="w-full bg-white/5 hover:bg-white/10 border-purple-700 text-white h-12 text-base"
              type="button"
            >
              <FaGoogle className="mr-3 h-5 w-5" />
              Iniciar sesión con Google
            </Button>
            <Button
              onClick={() => handleSignIn('authentik')}
              variant="outline"
              className="w-full bg-white/5 hover:bg-white/10 border-purple-700 text-white h-12 text-base"
            >
              <FaFacebook className="mr-3 h-5 w-5 text-blue-400" />
              Continuar con Facebook
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
