# Fetching the minified node image on apline linux
FROM node:20-alpine as build

# Declaring env
ENV NODE_ENV production

# Setting up the work directory
WORKDIR ./

# Copying all the files in our project
COPY . .

# Installing dependencies
RUN npm install

# Installing pm2 globally
RUN npm install pm2 -g
RUN npm run build

# Starting our application
CMD pm2 start process.yml && tail -f /dev/null

# Exposing server port
EXPOSE 3000
