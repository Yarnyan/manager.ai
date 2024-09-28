
FROM node:18 as build

WORKDIR /src/

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
