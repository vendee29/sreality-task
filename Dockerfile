FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

EXPOSE 8080

# Set the command to run your server
CMD ["npm", "run", "start"]
