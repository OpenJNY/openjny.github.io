FROM node:latest

WORKDIR /blog

ADD package.json .
RUN yarn

EXPOSE 8080
CMD [ "/bin/bash" ]