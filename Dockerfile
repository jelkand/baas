FROM node:12.8.0-alpine as dev

COPY package.json /usr/src/app/package.json
WORKDIR /usr/src/app

RUN yarn

COPY . .

RUN yarn build

ENTRYPOINT [ "docker-entrypoint.sh" ]
CMD yarn start:dev

# FROM node:12.8.0-alpine as prod

# WORKDIR /usr/src/app

# RUN yarn --prod

# COPY . .

# RUN yarn build

# ENTRYPOINT [ "docker-entrypoint.sh" ]
# CMD yarn start:ci