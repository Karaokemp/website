// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
//import * as songs from '../../static/songs.json'
import {listSongs} from '../../functions/s3Functions'
import packageResponse from '../../helpers/packageResponse';

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
export const handler = async () => {

const  S3_BUCKET = process.env['S3_BUCKET']
console.log(`got bucket ${S3_BUCKET} from environment.`)


    const songs = await listSongs()
   

    return packageResponse(songs)
}
