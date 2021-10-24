FROM node:alpine
RUN npm install pm2 -g
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
CMD ["pm2-runtime", "ecosystem.config.js"]
