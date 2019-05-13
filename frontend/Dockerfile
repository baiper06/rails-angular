##### Angular ##### 

FROM node:8.16.0-alpine AS builder
COPY . ./frontend
WORKDIR /frontend
RUN npm i
RUN npm rebuild node-sass
RUN $(npm bin)/ng build --prod

FROM nginx:1.15.8-alpine
COPY --from=builder /frontend/dist/frontend/ /usr/share/nginx/html
