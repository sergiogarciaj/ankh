FROM node:20-bullseye

# Instala Python y pip si los necesitas
RUN apt-get update && apt-get install -y python3 python3-pip && \
    pip3 install --upgrade pip

# Instala pnpm
RUN npm install -g pnpm

# Crea y usa el directorio de trabajo
WORKDIR /app

# Copia los archivos
COPY . .

# Instala dependencias con pnpm
RUN pnpm install --frozen-lockfile

# Instala dependencias Python si las hay
RUN pip3 install -r requirements.txt || true

# Expone el puerto para Next.js
EXPOSE 3000

# Comando de inicio para desarrollo con variables de producción
CMD ["pnpm", "dev"]

