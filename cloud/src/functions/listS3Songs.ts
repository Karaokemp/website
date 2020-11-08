const {S3_BUCKET} = process.env
import AWS from 'aws-sdk'
import { listSongs } from '../app';
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export async function  listS3Songs() {
  let result = await s3.listObjectsV2({
    Bucket: S3_BUCKET,
   }).promise()
   let objects = result.Contents
   let songs = objects.map(object=>object.Key)
   return songs
}

listS3Songs().then(songs=>{
  console.log(songs)
}).catch((err:Error)=>{
  console.error(err.message)
});