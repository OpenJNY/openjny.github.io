FROM node:latest
MAINTAINER openjny, openjny@gmail.com

WORKDIR /tmp
# RUN apt update && apt install -y 
RUN wget https://github.com/jgm/pandoc/releases/download/2.8.0.1/pandoc-2.8.0.1-1-amd64.deb -nv && \
    dpkg -i pandoc-2.8.0.1-1-amd64.deb && \
    npm install hexo-cli -g

WORKDIR /blog
COPY . /blog

RUN npm install

EXPOSE 4000

CMD ["/bin/bash"]