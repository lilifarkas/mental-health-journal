# Use an official Node.js runtime as a parent image
FROM node:lts-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the code to the container
COPY . .

# Build the app
RUN npm run build

# Set the command to start the app
CMD ["npm", "start"]


#FROM node:alpine
#
#WORKDIR /app
#
#EXPOSE 3000
#
#ENV PATH /app/node_modules/.bin:$PATH
#
#COPY package.json ./
#COPY package-lock.json ./
#RUN npm install --silent
#RUN npm install react-scripts@5.0.1 -g --silent
#
#COPY . ./
#
#CMD ["npm", "start"]