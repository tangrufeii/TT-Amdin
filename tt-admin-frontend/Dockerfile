FROM node:20-alpine AS build
WORKDIR /build
COPY tt-admin-frontend/ ./
RUN corepack enable   && pnpm install --frozen-lockfile   && pnpm build

FROM nginx:1.25-alpine
COPY tt-admin-frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /build/dist /usr/share/nginx/html
EXPOSE 80
