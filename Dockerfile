FROM node:14-alpine

WORKDIR /usr/api

COPY ./ ./

# npm ci - like npm install without devDependecies
RUN npm ci

EXPOSE 5500

ENTRYPOINT ["npm"]
CMD ["start"]

