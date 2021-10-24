FROM node:14.15.0-alpine as build
WORKDIR /app
RUN npm i serve -g
ENV PATH /app/node_modules/.bin:$PATH
COPY ./package.json /app/
RUN npm install --silent
COPY . /app
RUN npm run build
CMD ["npx","serve","dist"]