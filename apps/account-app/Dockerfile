FROM node:18-alpine
WORKDIR /usr/src/app
COPY ../../package*.json ./
COPY ../../tsconfig*.json ./
COPY ../../node_modules ./node_modules
COPY . .
RUN npm run build account-app 
CMD ["node", "dist/apps/account-app/main.js"]
