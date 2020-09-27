import  youtubedl from 'youtube-dl'
import AWS from 'aws-sdk'
import {KaraokempSong, S3URL, Song,YoutubeURL} from '../types'

const  S3_BUCKET = process.env['S3_BUCKET']

AWS.config.update({region: 'eu-central-1'});
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

export default function upload(link:YoutubeURL){
  const videoId:string = link.searchParams.get('v')
  return new Promise<KaraokempSong>((resolve:Function,reject:Function)=>{
    let youtubedlInfo: youtubedl.Info
    let s3Info:{Location: string, Bucket: string, Key: string, ETag: string}
    const video = youtubedl(link.href,
      ['--format=18'],
      {})

    video.on('error', function(err) {
        reject(err);
    });
          video.on('info', function(info:youtubedl.Info) {
            youtubedlInfo = info
            let uploadParams:any = {Bucket:'karaoke-songs', Key:youtubedlInfo._filename, Body: video,ContentType:'video/mp4',ACL: 'public-read', Metadata: {videoId: videoId}}
            s3.upload(uploadParams, (err: any, data: {Location: string, Bucket: string, Key: string, ETag: string}) => {
              if (err) {
                reject(err);
              } if (data) {
                s3Info = data
                let song = new KaraokempSong(videoId,'','',youtubedlInfo._filename,new S3URL(s3Info.Location))
                resolve(song)
              }
            });

          })
  })
}