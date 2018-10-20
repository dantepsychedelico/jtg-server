FROM node:6

MAINTAINER Zac Chung

RUN apt-get update && \
	apt-get install -y ssh vim git

RUN unlink /etc/localtime && ln -s /usr/share/zoneinfo/Asia/Taipei /etc/localtime

ADD . /home/node

RUN chown node:node -R /home/node

USER node

WORKDIR /home/node

RUN npm install

CMD ["npm", "start"]
