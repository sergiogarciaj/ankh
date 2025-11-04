import NextAuth from 'next-auth'
import { authConfig } from './auth.config'

/**
 * Este archivo exporta las funciones de autenticación para el middleware
 * Usa solo la configuración base sin providers que requieren Node.js
 */
const { auth, signIn, signOut } = NextAuth(authConfig)

export { auth, signIn, signOut }
