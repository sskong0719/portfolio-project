# Stage 1: Building the React application
FROM node:16-alpine as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install all dependencies, including 'devDependencies' since they might be needed for the build
RUN npm install

# Copy the rest of your source code to the image
COPY . .

# Build the application for production
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built assets from the build-stage to the nginx serve directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the service
EXPOSE 80

# Start Nginx and keep the process running
CMD ["npm","start"]
