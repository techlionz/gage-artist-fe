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

# Build the Angular app for staging
RUN npm run build --configuration=staging

# Use Nginx as base image for serving Angular application
FROM nginx:latest

# Remove default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ssl/kyc_pokerpad_net_chain.crt /etc/ssl/certs/kyc_pokerpad_net_chain.crt
COPY ssl/kyc_pokerpad_net.key /etc/ssl/private/kyc_pokerpad_net.key


# Copy built Angular app to Nginx public directory
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose HTTPS port
EXPOSE 443 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
