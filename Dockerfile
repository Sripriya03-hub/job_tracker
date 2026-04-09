# Asking it use node.js 18 version and alpine is the lightest version of linux
FROM node:18-alpine

# Setting up the working directory inside the container 
WORKDIR /app 

# Installing all the Json packages inside the container
COPY package*.json ./ 

# Installing all of your dependencies
RUN npm install  

# Copying all of your code 
COPY . . 

# Exposing the port of your application to the container
EXPOSE 3000  

# Finally run this command when the container is starting 
CMD ["node", "server.js"]  