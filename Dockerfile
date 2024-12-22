# Use Node.js as base image for build stage
FROM node:16.17.0-alpine3.16 as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Build the Angular app for production
RUN npm run build --configuration=production

# Use Nginx as base image for serving Angular application
FROM nginx:latest

# Copy built Angular app to Nginx public directory
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]