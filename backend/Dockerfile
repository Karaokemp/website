# build environment
FROM node:14.8.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH
ENV S3_BUCKET=karaoke-songs
COPY . /usr/src/app

EXPOSE 80
CMD ["npm", "start"]