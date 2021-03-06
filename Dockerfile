FROM node:14.17.0-alpine3.13
WORKDIR /usr/app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]