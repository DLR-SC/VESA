# Step 1: Build the Vite app
FROM node:18 AS build

# Define build arguments for environment variables
ARG VITE_API_URL

# Set environment variables during the build process
ENV VITE_API_URL=${VITE_API_URL}

# Set the working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your app's code
COPY . .

# Build the app using Vite
RUN npm run build

# Step 2: Use Nginx to serve the Vite build
FROM nginx:alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the Nginx web server
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
