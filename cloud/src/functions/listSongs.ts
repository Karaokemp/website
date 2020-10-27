// import individual service
import AWS from 'aws-sdk'
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default async function  listSongs() {
  let result = await s3.listObjectsV2({
    Bucket: 'karaoke-songs',
   }).promise()
   let objects = result.Contents
   let songs = objects.map(object=>object.Key)
   return songs
 }