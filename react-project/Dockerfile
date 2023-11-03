# Use a specific version of node alpine for consistency
FROM node:16-alpine as build-stage

# Set the working directory in the Docker image
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install --production

# Copy the rest of your application's source code from your host to your image filesystem.
COPY . .

# Build the application for production
RUN npm run build

# Use the nginx alpine image for serving the content
FROM nginx:alpine as production-stage

# Copy the built assets from the build-stage to the nginx default serve directory
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expose port 80 to the outside once the container has launched
EXPOSE 80

# Define the command to run your app using CMD which defines your runtime
# Here we use the "daemon off;" command to start nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
