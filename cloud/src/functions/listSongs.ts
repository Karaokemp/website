// import individual service
import AWS from 'aws-sdk'
const s3 = new AWS.S3({apiVersion: '2006-03-01'});



const  S3_BUCKET = process.env['S3_BUCKET']
console.log(`got bucket ${S3_BUCKET} from environment.`)

export default async function  listSongs() {
  return await s3.listObjectsV2({
    Bucket: 'karaoke-songs',
   }).promise()
 }