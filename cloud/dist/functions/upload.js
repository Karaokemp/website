"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const youtube_dl_1 = __importDefault(require("youtube-dl"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const types_1 = require("../types");
const S3_BUCKET = process.env['S3_BUCKET'];
aws_sdk_1.default.config.update({ region: 'eu-central-1' });
const s3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01' });
function upload() {
    const videoId = 'AUjmpbd-U2Q';
    return new Promise((resolve, reject) => {
        let youtubedlInfo;
        let s3Info;
        const video = youtube_dl_1.default(`https://www.youtube.com/watch?v=${videoId}`, ['--format=18'], {});
        video.on('error', function (err) {
            reject(err);
        });
        video.on('info', function (info) {
            youtubedlInfo = info;
            let uploadParams = { Bucket: 'kcs-test-karaoke-songs', Key: youtubedlInfo._filename, Body: video, ContentType: 'video/mp4', ACL: 'public-read', Metadata: { videoId: videoId } };
            s3.upload(uploadParams, (err, data) => {
                if (err) {
                    reject(err);
                }
                if (data) {
                    s3Info = data;
                    let song = new types_1.KaraokempSong(videoId, '', '', youtubedlInfo._filename, new types_1.S3URL(s3Info.Location));
                    resolve(song);
                }
            });
        });
    });
}
exports.default = upload;
upload().then(song => {
    console.log(song);
}).catch(err => {
    console.error(err);
});
