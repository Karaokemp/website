// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
//import * as songs from '../../static/songs.json'
import listSongs from '../../functions/listSongs'

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
export const lambdaHandler = async () => {
        response = {
            'statusCode': 200,
            'body': JSON.stringify(listSongs())
        }
    return response
};
