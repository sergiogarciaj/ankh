#!/bin/bash

# Configuración de NextAuth
export NEXTAUTH_URL=https://ankh.sergihno.cl
export NEXTAUTH_SECRET=Q8Aj2Gr4Z9uCCVfNOyBK4O69sezuqsB+YfwDztL27iQ=
export NEXTAUTH_URL_INTERNAL=http://localhost:3000

# Configuración de Authentik
export AUTHENTIK_CLIENT_ID=eOaVzH7BdeXfUSx66xUQWXH97v54IatK1DpAaOQB
export AUTHENTIK_CLIENT_SECRET=your-client-secret-here  # Reemplaza con tu client secret
export AUTHENTIK_ISSUER=https://auth.sergihno.cl/application/o/ankh/

# Mostrar las variables de entorno (solo para depuración)
echo "=== Configuración de NextAuth ==="
echo "- NEXTAUTH_URL: $NEXTAUTH_URL"
echo "- NEXTAUTH_URL_INTERNAL: $NEXTAUTH_URL_INTERNAL"
echo "- NEXTAUTH_SECRET: ${NEXTAUTH_SECRET:0:10}..."
echo "\n=== Configuración de Authentik ==="
echo "- AUTHENTIK_CLIENT_ID: $AUTHENTIK_CLIENT_ID"
echo "- AUTHENTIK_ISSUER: $AUTHENTIK_ISSUER"

# Iniciar el servidor de desarrollo
echo "\n=== Iniciando el servidor de desarrollo... ==="
pnpm dev
