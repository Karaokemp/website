
const BUCKET = 'karaokemp-songs';
const FILES_PATH = 'file-server/files/';

const fs = require('fs');
const ytdl = require('ytdl-core');
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./file-server/config.json');
const S3 = new AWS.S3();
const mime = require('mime-types');

function uploadFromYoutube(link){
    ytdl.getInfo(link, function(err, info) {
        let fileName = info.title + '.mp4';
        ytdl(link,{quality:'highest'}).pipe(fs.createWriteStream(FILES_PATH + fileName).on('finish', function() {
          console.log("downloaded " + fileName + ' !');
          fs.readFile(FILES_PATH + fileName, function (err, data) {
            if (err) { throw err; }
               let params = {Bucket: BUCKET, Key: fileName, Body: data,ContentType:mime.contentType(fileName) };
               S3.putObject(params, function(err, data) {
                   if (err) {
          
                       console.log(err)
                   } else {
                       console.log(" uploaded " +fileName + " to S3!");
                       return info.title;
                   }
                });
          });
                          
        }))
    });
}

module.exports = {
    upload:uploadFromYoutube
};
