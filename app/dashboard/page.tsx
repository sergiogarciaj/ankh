'use client';

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AuthButton } from "@/components/auth/auth-button"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirección automática inmediata a página principal
  useEffect(() => {
    if (session) {
      // Redirección inmediata
      window.location.replace('/')
    }
  }, [session])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black flex items-center justify-center">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black flex items-center justify-center">
        <div className="text-white">No autorizado</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-indigo-950 to-black">
      <div className="p-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard - Tarot Místico</h1>
          <AuthButton />
        </div>
        
        <div className="bg-gray-900/50 border-purple-900/50 backdrop-blur-sm rounded-lg p-6">
          <h2 className="text-xl text-white mb-4">¡Bienvenido, {session.user?.name}!</h2>
          <p className="text-purple-200 mb-2">Email: {session.user?.email}</p>
          <p className="text-purple-200 mb-4">Autenticación exitosa a través de Authentik</p>
          <p className="text-yellow-300 mb-4">Redirigiendo a la página principal en unos segundos...</p>
          
          <Button 
            onClick={() => {
              console.log('Button clicked - navigating to /')
              window.location.href = '/'
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Ir a la Página Principal
          </Button>
        </div>
      </div>
    </div>
  )
}