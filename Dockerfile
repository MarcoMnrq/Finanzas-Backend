# FROM node:10

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Install app dependencies
# COPY package.json /usr/src/app/
# RUN npm install --production --silent

# # Bundle app source
# COPY . /usr/src/app

# # WORKDIR /app
# # COPY ./package.json ./
# # RUN npm install
# # COPY . .
# # RUN npm run build
# # # EXPOSE 3000
# CMD ["npm", "run", "start:prod"]


FROM node:12-alpine
ENV NODE_ENV production
ENV PORT=$PORT
WORKDIR /usr/src/app
COPY . .
RUN npm install --production --silent
CMD ["npm", "run", "start:prod"]