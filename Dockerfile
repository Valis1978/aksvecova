# syntax=docker/dockerfile:1
#
# Production image for Coolify (Dockerfile build pack), replacing Nixpacks.
# Node.js comes from the official node:22-alpine image, so a redeploy picks up
# the latest Node.js 22 patch release; there is no nixpkgs revision to move by
# hand. next.config sets output: "standalone", so the runner holds only the
# traced server, .next/static and public/.
#
# Coolify injects `ARG KEY=value` for every build-time variable after each FROM.
# The runner stage has no RUN, so those values do not end up in its history.

ARG NODE_IMAGE=node:22-alpine

FROM ${NODE_IMAGE} AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build && rm -rf .next/cache

FROM ${NODE_IMAGE} AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
CMD ["node", "server.js"]
