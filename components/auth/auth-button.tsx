'use client';

import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { FaGoogle, FaFacebook, FaSignOutAlt } from "react-icons/fa"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Moon, Sparkles } from "lucide-react"

export function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
              <AvatarFallback>
                {session.user?.name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-gray-900 border-purple-900/50" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{session.user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-purple-900/50" />
          <DropdownMenuItem 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="text-red-400 hover:bg-red-500/10 focus:bg-red-500/10 focus:text-red-400"
          >
            <FaSignOutAlt className="mr-2 h-4 w-4" />
            <span>Cerrar sesión</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex gap-2">
      <Button
        onClick={() => signIn('authentik')}
        variant="outline"
        size="sm"
        className="hidden sm:flex items-center gap-2 bg-white/5 hover:bg-white/10 border-purple-700 text-white"
      >
        <Sparkles className="h-4 w-4" />
        <span>Iniciar sesión</span>
      </Button>
    </div>
  )
}
