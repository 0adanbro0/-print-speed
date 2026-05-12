FROM node:20-bookworm-slim AS build-stage
WORKDIR /-PRINT-SPEED

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build-stage /-PRINT-SPEED/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
