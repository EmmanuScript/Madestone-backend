# Use Node.js LTS version
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy peer deps to bypass conflicts
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev --legacy-peer-deps

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src ./src

# Expose port
EXPOSE 5000

# Start the application
CMD ["node", "dist/main.js"]
