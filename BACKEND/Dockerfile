# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the port your app runs on (e.g., 3001)
EXPOSE 3001

# Start the backend
CMD ["npm", "start"]
