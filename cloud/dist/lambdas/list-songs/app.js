"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lambdaHandler = void 0;
// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
const songs = require("../../static/songs.json");
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
exports.lambdaHandler = async () => {
    response = {
        'statusCode': 200,
        'body': JSON.stringify(songs)
    };
    return response;
};
