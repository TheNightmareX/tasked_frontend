FROM node:15-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig*.json angular.json .browserslistrc ngsw-config.json ./
COPY src/ src/
RUN npm run build

FROM nginx:1.21-alpine
COPY --from=build /app/dist/tasked/ /app/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/app.conf
