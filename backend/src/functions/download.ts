import  youtubedl from 'youtube-dl'
import fs from 'fs'



export default function download(url:URL){
  let forceResolve: Function
  let songInfo:youtubedl.Info
  let promise = new Promise((resolve,reject)=>{
      forceResolve = resolve

        const video = youtubedl(url.href,
        ['--format=18'],
        { cwd: __dirname })
        video.on('info', function(info:youtubedl.Info) {
          songInfo = info
            console.log('Download started')
            let file = `../songs/${info._filename}`
            video.pipe(fs.createWriteStream(`${info._filename}`))
          })
          video.on('end',(endInfo)=>{
            console.log(songInfo)
            forceResolve.bind(this)
          });
        })
        return promise     
}