FROM node:16-alpine

ENV HOME /root

WORKDIR /root

COPY . .

RUN npm run build

CMD npm start