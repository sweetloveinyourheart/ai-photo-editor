FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1
ENV API_ENDPOINT https://eiradev.com/api-v1
ENV NEXTAUTH_URL https://eiradev.com
ENV NEXTAUTH_SECRET my_ultra_secure_nextauth_secret
ENV GOOGLE_CLIENT_ID 310888365322-2uor783c9k68k0d3bva6nrcgrrfst9ut.apps.googleusercontent.com
ENV GOOGLE_CLIENT_SECRET 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
ENV PAYPAL_CLIENT_ID AcjyvOMl4DEGzZ8qLkyew-BX7UYuK9YogghLq9_NePl49fw_TR6vXmEppMu-sKajQj7vKnGwsdvS4JL1
ENV PAYPAL_APP_SECRET EHkgKizlHKect1ynT6oU3kX6i2UtwTaL0ke1pnvw4dRqP3vZ5VCVo_q9XvE3me1SsL_wjK-KFReZHZPC

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder /app/next.config.js ./ 
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
