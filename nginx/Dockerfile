# Use Nginx base image from Docker Hub
FROM nginx:alpine

# Copy static assets from builder stage
COPY --from=frontend /usr/share/nginx/html /usr/share/nginx/html

# Custom Nginx configuration
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside
EXPOSE 80

# Start Nginx when the container has launched
CMD ["nginx", "-g", "daemon off;"]
