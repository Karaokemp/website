"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.listSongs = void 0;
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
//import * as songs from '../../static/songs.json'
const packageResponse_1 = __importDefault(require("./helpers/packageResponse"));
const uploadSimple_1 = __importDefault(require("./functions/uploadSimple"));
/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 *
 */
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const packageError_1 = __importDefault(require("./helpers/packageError"));
const listS3Songs_1 = require("./functions/listS3Songs");
const s3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01' });
const { S3_BUCKET } = process.env;
async function listSongs() {
    let songs = await listS3Songs_1.listS3Songs();
    return packageResponse_1.default(songs);
}
exports.listSongs = listSongs;
async function upload(event) {
    let { source } = event.pathParameters;
    switch (source) {
        case 'youtube':
            let { video } = event.queryStringParameters;
            if (!video) {
                return packageError_1.default(400, 'Request must contain youtube videoId as query video param!');
            }
            try {
                let song = await /*uploadYoutubeVideo(video)*/ uploadSimple_1.default();
                return packageResponse_1.default(song);
            }
            catch (err) {
                return packageError_1.default(500, err);
            }
            break;
        case 'file':
            return packageError_1.default(501, 'File Uploadings are not implemented yet :( \nask Ophirus Magnivus to add this feature!');
    }
}
exports.upload = upload;
