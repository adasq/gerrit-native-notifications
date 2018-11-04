FROM node:10

ENV HOME=/gerrit-native-notifications

WORKDIR $HOME

COPY . $HOME

RUN npm install

CMD ["npm", "start"]