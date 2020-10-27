"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import individual service
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const s3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01' });
const S3_BUCKET = process.env['S3_BUCKET'];
console.log(`got bucket ${S3_BUCKET} from environment.`);
async function listSongs() {
    return await s3.listObjectsV2({
        Bucket: 'karaoke-songs',
    }).promise();
}
exports.default = listSongs;
