# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the remaining project files to the container
COPY . .

# Build the React app
RUN npm run build

# Set the command to start the React app
CMD ["npm", "start"]