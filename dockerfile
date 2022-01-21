FROM node:15-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig*.json angular.json .browserslistrc ngsw-config.json ./
COPY src/ src/
RUN npm run build

FROM nginx:1.21-alpine
WORKDIR /app
COPY --from=build /app/dist/tasked/ ./
WORKDIR /etc/nginx/conf.d
RUN rm default.conf \
    && echo "server {" > app.conf \
    && echo "   listen 80;" >> app.conf \
    && echo "   root /app;" >> app.conf \
    && echo "   location /en-US {" >> app.conf \
    && echo "     try_files \$uri \$uri/ /en-US/index.html;" >> app.conf \
    && echo "   }" >> app.conf \
    && echo "   location /zh {" >> app.conf \
    && echo "     try_files \$uri \$uri/ /zh/index.html;" >> app.conf \
    && echo "   }" >> app.conf \
    && echo "   location /graphql/ {" >> app.conf \
    && echo "       proxy_pass http://backend:3000/graphql/;" >> app.conf \
    && echo "   }" >> app.conf \
    && echo "}" >> app.conf
