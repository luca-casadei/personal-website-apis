# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /pwa-app
COPY . .
RUN yarn install --production
CMD ["node", "src/index.js"]
EXPOSE 8080
EXPOSE 8443
