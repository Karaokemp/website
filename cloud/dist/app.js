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
const s3 = new aws_sdk_1.default.S3({ apiVersion: '2006-03-01' });
const { S3_BUCKET } = process.env;
async function listSongs() {
    let result = await s3.listObjectsV2({
        Bucket: S3_BUCKET,
    }).promise();
    let objects = result.Contents;
    let songs = objects.map(object => object.Key);
    return packageResponse_1.default(songs);
}
exports.listSongs = listSongs;
async function upload(event) {
    let { video } = event.queryStringParameters;
    let { source } = event.pathParameters;
    return packageResponse_1.default(`need to download video ID: ${video} from ${source}`);
}
exports.upload = upload;
