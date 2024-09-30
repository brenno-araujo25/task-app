FROM node:21.7.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm rebuild bcrypt --build-from-source
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]