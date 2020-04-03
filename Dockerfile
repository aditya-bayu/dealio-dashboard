FROM node:12.14.1
WORKDIR /dashboard
COPY dashboard/ /dashboard
RUN npm install

CMD ["npm", "run", "serve"]