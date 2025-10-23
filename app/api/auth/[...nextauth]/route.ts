import NextAuth from 'next-auth';
import type { NextAuthConfig, DefaultSession } from 'next-auth';

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
const isProduction = process.env.NODE_ENV === 'production';

// Solo log en desarrollo
if (!isProduction) {
  console.log('NEXTAUTH_URL:', baseUrl);
  console.log('AUTHENTIK_CLIENT_ID:', process.env.AUTHENTIK_CLIENT_ID ? '***' : 'Not set');
}

const authConfig: NextAuthConfig = {
  providers: [
    {
      id: 'authentik',
      name: 'Authentik',
      type: 'oidc',
      issuer: process.env.AUTHENTIK_ISSUER,
      clientId: process.env.AUTHENTIK_CLIENT_ID,
      clientSecret: process.env.AUTHENTIK_CLIENT_SECRET || '',
      checks: ['pkce', 'state'],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name || profile.preferred_username,
          email: profile.email,
          image: profile.picture || null,
        };
      },
    },
  ],
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
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 días
  },
  cookies: {
    sessionToken: {
      name: isProduction ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: isProduction,
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: !isProduction, // Solo en desarrollo
  debug: false, // Desactivado en producción
};

export { authConfig };

// Create handlers
const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
const { GET, POST } = handlers;

export { GET, POST, auth, signIn, signOut };
