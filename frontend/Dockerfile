FROM node:14.8
COPY . .
#ENV CI=true
ENV SERVICE=frontend
RUN npm install
CMD npm run test:ci