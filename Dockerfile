FROM node:12
MAINTAINER "Anthony Rawlins <anthony.rawlins@unimelb.edu.au>"
# Create app directory
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# Bundle app source - ignores files in .dockerignore
COPY . .

EXPOSE 8000
CMD [ "node", "build/index.js" ]
