// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
//import * as songs from '../../static/songs.json'
import packageResponse from './helpers/packageResponse';

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
// import individual service
import AWS from 'aws-sdk'
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const {S3_BUCKET} = process.env

export async function  listSongs() {
  let result = await s3.listObjectsV2({
    Bucket: S3_BUCKET,
   }).promise()
   let objects = result.Contents
   let songs = objects.map(object=>object.Key)
   
   return packageResponse(songs)
 }