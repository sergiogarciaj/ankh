import { randomBytes } from 'node:crypto';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig, DefaultSession } from 'next-auth';

const isProduction = process.env.NODE_ENV === 'production';

const globalForAuth = globalThis as typeof globalThis & {
  __nextAuthDevSecret?: string;
  __nextAuthSecretWarned?: boolean;
};

const resolvedSecret =
  process.env.NEXTAUTH_SECRET ??
  (!isProduction
    ? (globalForAuth.__nextAuthDevSecret ||= randomBytes(32).toString('hex'))
    : undefined);

if (!process.env.NEXTAUTH_SECRET && !isProduction && !globalForAuth.__nextAuthSecretWarned) {
  console.warn('NEXTAUTH_SECRET not set. Using a randomly generated fallback secret for development.');
  globalForAuth.__nextAuthSecretWarned = true;
}

if (!resolvedSecret) {
  throw new Error('NEXTAUTH_SECRET must be set in production environments.');
}

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession['user']
  }
}

// Base URL configuration
const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

// Log environment variables for debugging
console.log('NEXTAUTH_URL:', baseUrl);
console.log('AUTHENTIK_CLIENT_ID:', process.env.AUTHENTIK_CLIENT_ID ? '***' : 'Not set');

const authentikIssuer = process.env.AUTHENTIK_ISSUER;
const authentikClientId = process.env.AUTHENTIK_CLIENT_ID;
const authentikClientSecret = process.env.AUTHENTIK_CLIENT_SECRET;

const providers: NextAuthConfig['providers'] = [];

if (authentikIssuer && authentikClientId && authentikClientSecret) {
  providers.push({
    id: 'authentik',
    name: 'Authentik',
    type: 'oidc',
    issuer: authentikIssuer,
    clientId: authentikClientId,
    clientSecret: authentikClientSecret,
    checks: ['pkce', 'state'],
    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name || profile.preferred_username,
        email: profile.email,
        image: profile.picture || null,
      };
    },
  });
} else if (!isProduction) {
  console.warn('Authentik configuration not found. Using development credentials provider.');
  providers.push(
    Credentials({
      name: 'Development Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'dev@example.com' },
      },
      authorize(credentials) {
        const email = credentials?.email as string | undefined;

        if (!email) {
          return null;
        }

        return {
          id: 'dev-user',
          name: 'Developer User',
          email,
        };
      },
    })
  );
} else {
  throw new Error('Authentik configuration must be provided in production.');
}

const authConfig: NextAuthConfig = {
  providers,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      try {
        // Handle the state parameter to get the return URL
        if (url.startsWith('/api/auth/callback/authentik')) {
          const urlObj = new URL(url, baseUrl);
          const state = urlObj.searchParams.get('state');
          
          if (state) {
            try {
              const stateParams = new URLSearchParams(state);
              const returnUrl = stateParams.get('returnUrl');
              if (returnUrl && returnUrl !== '/') {
                // Validate that the return URL is relative
                const returnUrlObj = new URL(returnUrl, baseUrl);
                if (returnUrlObj.origin === baseUrl) {
                  return returnUrl;
                }
              }
            } catch (e) {
              console.error('Error parsing return URL:', e);
            }
          }
          return baseUrl;
        }

        // Prevent redirects to internal auth routes
        if (url.includes('/if/') || url.includes('/user')) {
          return baseUrl;
        }
        
        // For other redirects
        if (url.startsWith('http')) {
          const urlObj = new URL(url);
          if (urlObj.origin === baseUrl) {
            return urlObj.pathname + urlObj.search + urlObj.hash;
          }
          return baseUrl;
        }
        
        // Ensure URLs are relative
        if (url.startsWith('/')) {
          return url;
        }
      } catch (e) {
        console.error('Redirect error:', e);
      }
      return baseUrl;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt'
  },
  secret: resolvedSecret,
  trustHost: true,
  debug: process.env.NODE_ENV === 'development'
};

export { authConfig };

// Create handlers
const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
const { GET, POST } = handlers;

export { GET, POST, auth, signIn, signOut };
