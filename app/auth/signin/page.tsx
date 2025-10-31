'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { signIn } from 'next-auth/react'
import { FaGoogle, FaGithub, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Moon, Sparkles, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleOAuthSignIn = (provider: string) => {
    const callbackUrl = window.location.pathname === '/auth/signin' ? '/' : window.location.href

    signIn(provider, {
      callbackUrl,
      redirect: true,
    }).catch((error) => {
      console.error('Error durante OAuth:', error)
      setError('Error al iniciar sesión')
    })
  }

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(result.error)
      } else if (result?.ok) {
        window.location.href = '/'
      }
    } catch (error) {
      setError('Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
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
          <CardContent className="space-y-6">
            {/* OAuth Providers */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => handleOAuthSignIn('google')}
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-gray-900 h-12 text-base"
                type="button"
              >
                <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
                Continuar con Google
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('github')}
                variant="outline"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white h-12 text-base"
                type="button"
              >
                <FaGithub className="mr-3 h-5 w-5" />
                Continuar con GitHub
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('facebook')}
                variant="outline"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
                type="button"
              >
                <FaFacebook className="mr-3 h-5 w-5" />
                Continuar con Facebook
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('twitter')}
                variant="outline"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white h-12 text-base"
                type="button"
              >
                <FaTwitter className="mr-3 h-5 w-5" />
                Continuar con X/Twitter
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-purple-500/30" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 px-2 text-purple-300 text-sm">
                o con email
              </span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleCredentialsSignIn} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-200">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-300"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-purple-200">
                  Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Tu contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-300"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
            </form>

            <div className="text-center text-sm text-purple-300">
              ¿No tienes una cuenta?{' '}
              <Link href="/auth/register" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Regístrate
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
