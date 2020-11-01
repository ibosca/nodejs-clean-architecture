# Build stage
FROM node:10 AS builder
WORKDIR /app
COPY ./package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Run stage
FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["npm", "run", "start:prod"]