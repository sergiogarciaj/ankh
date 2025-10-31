# Guía de Configuración de OAuth Providers

Esta guía te ayudará a configurar cada proveedor de autenticación OAuth para tu aplicación.

## Resumen

Tu aplicación ahora soporta múltiples métodos de autenticación:

- **Google OAuth** - Login con cuenta de Google
- **GitHub OAuth** - Login con cuenta de GitHub
- **Facebook OAuth** - Login con cuenta de Facebook
- **Twitter/X OAuth** - Login con cuenta de Twitter/X
- **Email/Password** - Registro y login con credenciales locales

## URLs de Callback

Todas las aplicaciones OAuth requieren configurar URLs de redirección (callback URLs). Usa estas URLs según tu entorno:

### Desarrollo Local
```
http://localhost:3000/api/auth/callback/google
http://localhost:3000/api/auth/callback/github
http://localhost:3000/api/auth/callback/facebook
http://localhost:3000/api/auth/callback/twitter
```

### Producción
Reemplaza `localhost:3000` con tu dominio:
```
https://tu-dominio.com/api/auth/callback/google
https://tu-dominio.com/api/auth/callback/github
https://tu-dominio.com/api/auth/callback/facebook
https://tu-dominio.com/api/auth/callback/twitter
```

---

## 1. Google OAuth

### Paso 1: Crear Proyecto en Google Cloud Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la **Google+ API**

### Paso 2: Crear Credenciales OAuth
1. Ve a **APIs & Services > Credentials**
2. Haz clic en **+ CREATE CREDENTIALS > OAuth client ID**
3. Selecciona **Web application**
4. Configura:
   - **Name**: Ankh App
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`

### Paso 3: Obtener Credenciales
1. Copia el **Client ID** (termina en `.apps.googleusercontent.com`)
2. Copia el **Client Secret**
3. Agrégalos a tu `.env.local`:
```bash
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret
```

### Paso 4: Configurar Pantalla de Consentimiento
1. Ve a **OAuth consent screen**
2. Selecciona **External** para usuarios de cualquier cuenta de Google
3. Completa la información requerida:
   - App name: Ankh App
   - User support email: tu@email.com
   - Developer contact: tu@email.com
4. Agrega los scopes: `email`, `profile`, `openid`

---

## 2. GitHub OAuth

### Paso 1: Crear OAuth App
1. Ve a [GitHub Developer Settings](https://github.com/settings/developers)
2. Haz clic en **OAuth Apps > New OAuth App**

### Paso 2: Configurar Aplicación
Completa el formulario:
- **Application name**: Ankh App
- **Homepage URL**: `http://localhost:3000`
- **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
- **Description**: Aplicación de tarot místico

### Paso 3: Obtener Credenciales
1. Copia el **Client ID**
2. Genera un nuevo **Client Secret** y cópialo
3. Agrégalos a tu `.env.local`:
```bash
GITHUB_CLIENT_ID=tu-github-client-id
GITHUB_CLIENT_SECRET=tu-github-client-secret
```

**Nota**: El Client Secret solo se muestra una vez. Guárdalo de forma segura.

---

## 3. Facebook OAuth

### Paso 1: Crear Aplicación en Facebook
1. Ve a [Facebook Developers](https://developers.facebook.com/apps)
2. Haz clic en **Create App**
3. Selecciona **Consumer** como tipo de app
4. Completa el nombre: **Ankh App**

### Paso 2: Configurar Facebook Login
1. En el panel de tu app, ve a **Add Products**
2. Busca **Facebook Login** y haz clic en **Set Up**
3. Selecciona **Web** como plataforma
4. En **Settings > Basic**, copia:
   - **App ID** (este es tu Client ID)
   - **App Secret** (este es tu Client Secret)

### Paso 3: Configurar Valid OAuth Redirect URIs
1. Ve a **Facebook Login > Settings**
2. En **Valid OAuth Redirect URIs**, agrega:
   ```
   http://localhost:3000/api/auth/callback/facebook
   ```
3. Guarda los cambios

### Paso 4: Agregar a .env.local
```bash
FACEBOOK_CLIENT_ID=tu-facebook-app-id
FACEBOOK_CLIENT_SECRET=tu-facebook-app-secret
```

### Paso 5: Hacer Pública la App (Producción)
- En modo desarrollo, solo tú y los usuarios de prueba pueden usar la app
- Para producción, debes enviar la app para revisión y hacerla pública

---

## 4. Twitter/X OAuth

### Paso 1: Crear Proyecto en Twitter Developer Portal
1. Ve a [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Si no tienes acceso, solicita acceso a la API (puede tardar unos días)
3. Crea un nuevo **Project** y luego una nueva **App**

### Paso 2: Configurar OAuth 2.0
1. En tu app, ve a **Settings**
2. Baja a **User authentication settings** y haz clic en **Set up**
3. Configura:
   - **App permissions**: Read
   - **Type of App**: Web App
   - **Callback URI / Redirect URL**: `http://localhost:3000/api/auth/callback/twitter`
   - **Website URL**: `http://localhost:3000`

### Paso 3: Obtener Credenciales OAuth 2.0
1. En **Keys and tokens**, busca la sección **OAuth 2.0 Client ID and Client Secret**
2. Copia:
   - **Client ID**
   - **Client Secret** (solo se muestra una vez)

### Paso 4: Agregar a .env.local
```bash
TWITTER_CLIENT_ID=tu-twitter-client-id
TWITTER_CLIENT_SECRET=tu-twitter-client-secret
```

**Nota**: Asegúrate de usar OAuth 2.0, no OAuth 1.0a.

---

## 5. Autenticación Local (Email/Password)

La autenticación local ya está configurada y funciona sin necesidad de credenciales externas.

### Características
- Registro de nuevos usuarios con validación estricta
- Login con email y contraseña
- Rate limiting (3 intentos cada 15 minutos)
- Contraseñas hasheadas con PBKDF2 + salt

### Requisitos de Contraseña
- Mínimo 8 caracteres
- Al menos una mayúscula
- Al menos una minúscula
- Al menos un número

### Usuario de Prueba
Para testing, existe un usuario precargado:
```
Email: test@example.com
Password: password123
```

---

## Verificación de Configuración

### 1. Verifica tu archivo .env.local

Tu archivo `.env.local` debe contener:

```bash
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=tu-secret-generado-con-openssl
NEXTAUTH_URL_INTERNAL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=tu-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=tu-client-secret

# GitHub OAuth
GITHUB_CLIENT_ID=tu-github-client-id
GITHUB_CLIENT_SECRET=tu-github-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=tu-facebook-app-id
FACEBOOK_CLIENT_SECRET=tu-facebook-app-secret

# Twitter OAuth
TWITTER_CLIENT_ID=tu-twitter-client-id
TWITTER_CLIENT_SECRET=tu-twitter-client-secret

# OpenAI
OPENAI_API_KEY=sk-tu-api-key

# Environment
NODE_ENV=development
```

### 2. Reinicia el servidor

Después de agregar las variables de entorno:

```bash
# Si usas Docker
docker-compose restart

# Si usas pnpm directamente
pnpm dev
```

### 3. Prueba cada proveedor

1. Ve a `http://localhost:3000/auth/signin`
2. Prueba cada botón de OAuth
3. Verifica que la redirección funcione correctamente
4. Prueba también el registro local con email/password

---

## Solución de Problemas

### Error: "Configuration"
- Verifica que todas las variables de entorno estén en `.env.local`
- Asegúrate de que no haya espacios alrededor del `=`
- Reinicia el servidor después de cambiar variables

### Error: "redirect_uri_mismatch" (Google, Facebook)
- Verifica que la callback URL en la plataforma coincida exactamente con la configurada
- Incluye `http://` o `https://`
- No agregues `/` al final

### Error: "invalid_client" (GitHub, Twitter)
- Verifica que el Client ID y Secret estén correctos
- Asegúrate de que el Client Secret no tenga espacios
- Regenera el secret si es necesario

### El login funciona pero no guarda la sesión
- Verifica que `NEXTAUTH_SECRET` esté configurado
- Genera uno nuevo con: `openssl rand -base64 32`
- Asegúrate de que `NEXTAUTH_URL` apunte al dominio correcto

### Rate limit al registrarse
- Espera 15 minutos después de 3 intentos fallidos
- O reinicia el servidor (borra el rate limit de memoria)

---

## Modo Producción

### Cambios necesarios para producción:

1. **Actualiza NEXTAUTH_URL**:
```bash
NEXTAUTH_URL=https://tu-dominio.com
```

2. **Actualiza todas las Callback URLs** en cada proveedor OAuth

3. **Cambia NODE_ENV**:
```bash
NODE_ENV=production
```

4. **Migra el almacenamiento de usuarios** de in-memory a base de datos real (PostgreSQL, MongoDB, etc.)

5. **Configura cookies seguras**: Ya está configurado para producción en `app/api/auth/[...nextauth]/route.ts`

---

## Seguridad

✅ **Ya implementado:**
- HTTPS solo en producción
- Cookies seguras con httpOnly y sameSite
- Contraseñas hasheadas (nunca en texto plano)
- Rate limiting en registro
- Validación de inputs con Zod
- CSRF protection incluido en NextAuth

⚠️ **Recomendaciones adicionales:**
- Nunca comitas `.env.local` al repositorio
- Usa secretos diferentes para desarrollo y producción
- Rota los Client Secrets regularmente
- Monitorea intentos de login fallidos
- Implementa 2FA para usuarios importantes

---

## Recursos Adicionales

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Guide](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Guide](https://docs.github.com/en/apps/oauth-apps)
- [Facebook Login Guide](https://developers.facebook.com/docs/facebook-login)
- [Twitter OAuth 2.0 Guide](https://developer.twitter.com/en/docs/authentication/oauth-2-0)
