FROM node:18
# Create app directory
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built app
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80