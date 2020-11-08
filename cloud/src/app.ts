// const axios = require('axios')
// const url = 'http://checkip.amazonaws.com/';
let response;
//import * as songs from '../../static/songs.json'
import packageResponse from './helpers/packageResponse';
import uploadYoutubeVideo from './functions/uploadYoutubeVideo'
import uploadSimple from './functions/uploadSimple'

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
import AWS from 'aws-sdk'
import  youtubedl from 'youtube-dl'
import packageError from './helpers/packageError';
import { KaraokempSong } from './types';
import { listS3Songs } from './functions/listS3Songs';

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const {S3_BUCKET} = process.env

export async function  listSongs() {
   let songs = await listS3Songs()
   return packageResponse(songs)
 }

 export async function upload(event:AWSLambda.APIGatewayEvent){
     let {source} = event.pathParameters
     switch(source){
        case 'youtube':
                    let {video} = event.queryStringParameters
                    if(!video){
                      return packageError(400,'Request must contain youtube videoId as query video param!')
                    }
                    try{
                      let song: KaraokempSong = await /*uploadYoutubeVideo(video)*/ uploadSimple()
                      return packageResponse(song)
                    }catch(err:any){
                        return packageError(500,err)
                    }
        break;
        case 'file':
          return packageError(501,'File Uploadings are not implemented yet :( \nask Ophirus Magnivus to add this feature!')
    }    
 }