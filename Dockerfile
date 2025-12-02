# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies
RUN npm install --legacy-peer-deps

# Copy entire application
COPY . .

# Expose port
EXPOSE 5000

# Start the application using ts-node
CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "src/main.ts"]
