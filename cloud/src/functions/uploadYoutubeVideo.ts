import { KaraokempSong } from "../types";
const {S3_BUCKET} = process.env


const stream = require('stream');
const passtrough = new stream.PassThrough();

export default function uploadYoutubeVideo(videoId:string): Promise<KaraokempSong>{
  console.log(`Need to upload video ${videoId}`)
  return new Promise<KaraokempSong>((resolve:Function,reject:Function)=>{

    const stream = require('stream');
    const passtrough = new stream.PassThrough();
    const youtubedl = require('youtube-dl');
    const dl = youtubedl(videoId, ['--format=best[ext=mp4]'], {maxBuffer: Infinity});
    dl.pipe(passtrough); // write video to the pass-through stream
    const AWS = require('aws-sdk');
    console.log(S3_BUCKET)
    const upload = new AWS.S3.ManagedUpload({
  params: {
    Bucket: S3_BUCKET,
    Key: 'video.mp4',
    Body: passtrough
  },
  partSize: 1024 * 1024 * 64 // 64 MB in bytes
});
upload.send((err:any) => {
  if (err) {
    console.log('error', err);
    reject(`S3 Error: ${err.message}`)
  } else {
    console.log('done');
    resolve(null)
  }
});
  
  })
}

uploadYoutubeVideo('AUjmpbd-U2Q').then(song=>{
  console.log(song)
}).catch(err=>{
  console.error(err)
})
