'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { signIn } from 'next-auth/react'
import { FaGoogle, FaGithub, FaFacebook, FaTwitter } from 'react-icons/fa'
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [mostrarPassword, setMostrarPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  // Validación en tiempo real de requisitos de contraseña
  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    match: password === confirmPassword && password.length > 0,
  }

  const allRequirementsMet = Object.values(passwordRequirements).every(Boolean)

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, {
      callbackUrl: '/',
      redirect: true,
    }).catch((error) => {
      console.error('Error durante OAuth:', error)
      setError('Error al iniciar sesión con ' + provider)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validación de contraseñas coincidentes
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      setLoading(false)
      return
    }

    // Validación de requisitos de contraseña
    if (!allRequirementsMet) {
      setError('La contraseña no cumple con todos los requisitos')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        // Manejo de errores específicos
        if (data.code === 'VALIDATION_ERROR' && data.details) {
          const errorMessages = data.details.map((err: any) => err.message).join(', ')
          setError(errorMessages)
        } else {
          setError(data.error || 'Error al crear la cuenta')
        }
        setLoading(false)
        return
      }

      // Registro exitoso
      setSuccess(true)

      // Redirigir a login después de 2 segundos
      setTimeout(() => {
        router.push('/auth/signin')
      }, 2000)
    } catch (error) {
      console.error('Error en registro:', error)
      setError('Error al comunicarse con el servidor')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-purple-400 hover:text-purple-300 mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al Inicio
            </Button>
          </Link>
        </div>

        <Card className="bg-gradient-to-b from-purple-900/50 to-indigo-900/50 border-purple-500/30">
          <CardHeader className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">☥</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-white">Únete al Círculo Místico</CardTitle>
            <p className="text-purple-200">Crea tu cuenta y comienza tu viaje espiritual</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Mensaje de éxito */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-md p-3 text-green-200 text-sm flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                ¡Cuenta creada exitosamente! Redirigiendo al inicio de sesión...
              </div>
            )}

            {/* OAuth Providers */}
            <div className="grid grid-cols-1 gap-3">
              <Button
                onClick={() => handleOAuthSignIn('google')}
                variant="outline"
                className="w-full bg-white hover:bg-gray-100 text-gray-900 h-12 text-base"
                type="button"
                disabled={loading || success}
              >
                <FaGoogle className="mr-3 h-5 w-5 text-red-500" />
                Continuar con Google
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('github')}
                variant="outline"
                className="w-full bg-gray-800 hover:bg-gray-700 text-white h-12 text-base"
                type="button"
                disabled={loading || success}
              >
                <FaGithub className="mr-3 h-5 w-5" />
                Continuar con GitHub
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('facebook')}
                variant="outline"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base"
                type="button"
                disabled={loading || success}
              >
                <FaFacebook className="mr-3 h-5 w-5" />
                Continuar con Facebook
              </Button>

              <Button
                onClick={() => handleOAuthSignIn('twitter')}
                variant="outline"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white h-12 text-base"
                type="button"
                disabled={loading || success}
              >
                <FaTwitter className="mr-3 h-5 w-5" />
                Continuar con X/Twitter
              </Button>
            </div>

            <div className="relative">
              <Separator className="bg-purple-500/30" />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-purple-900 px-2 text-purple-300 text-sm">
                o crea tu cuenta
              </span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3 text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name" className="text-purple-200">
                  Nombre Completo
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre místico"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-300"
                    required
                    minLength={2}
                    disabled={loading || success}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-200">
                  Correo Electrónico
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
                    disabled={loading || success}
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
                    type={mostrarPassword ? "text" : "password"}
                    placeholder="Crea una contraseña segura"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-300"
                    required
                    disabled={loading || success}
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-3 top-3 text-purple-400 hover:text-purple-300"
                  >
                    {mostrarPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Requirements */}
                {password && (
                  <div className="mt-2 space-y-1 text-xs">
                    <PasswordRequirement met={passwordRequirements.length}>
                      Mínimo 8 caracteres
                    </PasswordRequirement>
                    <PasswordRequirement met={passwordRequirements.uppercase}>
                      Al menos una mayúscula
                    </PasswordRequirement>
                    <PasswordRequirement met={passwordRequirements.lowercase}>
                      Al menos una minúscula
                    </PasswordRequirement>
                    <PasswordRequirement met={passwordRequirements.number}>
                      Al menos un número
                    </PasswordRequirement>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-purple-200">
                  Confirmar Contraseña
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-purple-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirma tu contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 bg-purple-900/30 border-purple-500/50 text-white placeholder:text-purple-300"
                    required
                    disabled={loading || success}
                  />
                </div>
                {confirmPassword && (
                  <PasswordRequirement met={passwordRequirements.match}>
                    Las contraseñas coinciden
                  </PasswordRequirement>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3"
                disabled={loading || success || !allRequirementsMet}
              >
                {loading ? 'Creando cuenta...' : success ? '¡Cuenta creada!' : 'Crear Cuenta Sagrada'}
              </Button>
            </form>

            <div className="text-center text-sm text-purple-300">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/auth/signin" className="text-yellow-400 hover:text-yellow-300 font-semibold">
                Inicia Sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Componente helper para mostrar requisitos de contraseña
function PasswordRequirement({ met, children }: { met: boolean; children: React.ReactNode }) {
  return (
    <div className={`flex items-center gap-1 ${met ? 'text-green-400' : 'text-purple-300'}`}>
      {met ? <CheckCircle2 className="h-3 w-3" /> : <XCircle className="h-3 w-3" />}
      <span>{children}</span>
    </div>
  )
}
