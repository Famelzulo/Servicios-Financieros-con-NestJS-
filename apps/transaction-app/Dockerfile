FROM node:18-alpine
WORKDIR /usr/src/app
COPY ../../package*.json ./
COPY ../../tsconfig*.json ./
COPY ../../node_modules ./node_modules
COPY . .
RUN npm run build transaction-app 
CMD ["node", "dist/apps/transaction-app/main.js"]
