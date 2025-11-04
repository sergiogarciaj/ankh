import NextAuth from 'next-auth'
import type { DefaultSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import TwitterProvider from 'next-auth/providers/twitter'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail, verifyPassword } from '@/lib/auth/users'
import { authConfig as baseAuthConfig } from '@/auth.config'

// Force Node.js runtime to support crypto module
export const runtime = 'nodejs'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
    } & DefaultSession['user']
  }
}

// Base URL configuration
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'
const isProduction = process.env.NODE_ENV === 'production'

// Solo log en desarrollo
if (!isProduction) {
  console.log('NEXTAUTH_URL:', baseUrl)
  console.log('Providers configured:', [
    process.env.GOOGLE_CLIENT_ID ? 'Google' : null,
    process.env.GITHUB_CLIENT_ID ? 'GitHub' : null,
    process.env.FACEBOOK_CLIENT_ID ? 'Facebook' : null,
    process.env.TWITTER_CLIENT_ID ? 'Twitter' : null,
  ].filter(Boolean).join(', '))
}

// Extend base config with providers that require Node.js runtime
const authConfig = {
  ...baseAuthConfig,
  providers: [
    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),

    // GitHub OAuth
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),

    // Facebook OAuth
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),

    // Twitter/X OAuth
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID || '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET || '',
      version: '2.0', // Twitter OAuth 2.0
    }),

    // Credentials (Email/Password)
    CredentialsProvider({
      name: 'Email y Contraseña',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'tu@email.com' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Por favor ingresa email y contraseña')
        }

        const user = await getUserByEmail(credentials.email as string)

        if (!user) {
          throw new Error('Usuario no encontrado')
        }

        const isValid = await verifyPassword(
          credentials.password as string,
          user.password
        )

        if (!isValid) {
          throw new Error('Contraseña incorrecta')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image || null,
        }
      },
    }),
  ],
  callbacks: {
    ...baseAuthConfig.callbacks,
    async jwt({ token, account, profile, user }) {
      if (account) {
        token.accessToken = account.access_token
        token.id = profile?.sub || user?.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.name = token.name as string
        session.user.email = token.email as string
        session.user.image = token.picture as string
        session.accessToken = token.accessToken as string
      }
      return session
    },
  },
}

export { authConfig }

// Create handlers
const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
const { GET, POST } = handlers

export { GET, POST, auth, signIn, signOut }
