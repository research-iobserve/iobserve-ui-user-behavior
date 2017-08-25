FROM node:6.11.2

COPY public/ /public/
COPY src/ /src/
COPY package.json /
COPY yarn.lock /
COPY .flowconfig /

RUN yarn install

EXPOSE 3000

CMD [ "npm", "start" ]



