FROM lambci/lambda:build-nodejs12.x

ENV AWS_DEFAULT_REGION us-east-1
COPY . .
RUN rm -rf node_modules
RUN npm install
RUN npm run build
WORKDIR /var/task/dist/functions
ENV S3_BUCKET=kcs-test-karaoke-songs
CMD ["node","uploadYoutubeVideo.js"]