FROM node:16-alpine

ENV HOME /root
WORKDIR /root

COPY . .
RUN npm install

EXPOSE 3000

CMD npm start