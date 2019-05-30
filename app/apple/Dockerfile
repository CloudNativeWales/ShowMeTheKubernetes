FROM node:9-slim

EXPOSE 3000
WORKDIR /app
COPY package.json index.js ./
RUN npm install

CMD ["npm", "start"]