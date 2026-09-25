# --- Etapa 1: Instalación de Dependencias ---
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- Etapa 2: Construcción de la Aplicación ---
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Desactivamos la verificación estricta de telemetría de Next.js en producción
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# --- Etapa 3: Entorno de Ejecución (Producción) ---
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Crear un usuario del sistema para no correr Docker como root (Seguridad)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["npm", "start"]
