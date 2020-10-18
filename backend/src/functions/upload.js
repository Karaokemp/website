"use strict";
exports.__esModule = true;
var youtube_dl_1 = require("youtube-dl");
var aws_sdk_1 = require("aws-sdk");
var types_1 = require("../types");
var S3_BUCKET = process.env['S3_BUCKET'];
aws_sdk_1["default"].config.update({ region: 'eu-central-1' });
var s3 = new aws_sdk_1["default"].S3({ apiVersion: '2006-03-01' });
function upload(link) {
    var videoId = link.searchParams.get('v');
    return new Promise(function (resolve, reject) {
        var youtubedlInfo;
        var s3Info;
        var video = youtube_dl_1["default"](link.href, ['--format=18'], {});
        video.on('error', function (err) {
            reject(err);
        });
        video.on('info', function (info) {
            youtubedlInfo = info;
            var uploadParams = { Bucket: 'karaoke-songs', Key: youtubedlInfo._filename, Body: video, ContentType: 'video/mp4', ACL: 'public-read', Metadata: { videoId: videoId } };
            s3.upload(uploadParams, function (err, data) {
                if (err) {
                    reject(err);
                }
                if (data) {
                    s3Info = data;
                    var song = new types_1.KaraokempSong(videoId, '', '', youtubedlInfo._filename, new types_1.S3URL(s3Info.Location));
                    resolve(song);
                }
            });
        });
    });
}
exports["default"] = upload;
