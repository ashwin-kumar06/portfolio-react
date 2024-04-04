# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3000

# Define environment variable
ENV NODE_ENV=production

# Build your app
RUN npm run build

# Start the application
CMD ["npm", "start"]
