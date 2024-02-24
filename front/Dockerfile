FROM node:16.13.1-alpine

COPY . /app/front

WORKDIR /app/front

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]