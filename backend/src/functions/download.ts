import  youtubedl from 'youtube-dl'
import fs from 'fs'



export default function download(url:URL){
  let forceResolve: Function
  let songInfo;
    let promise = new Promise((resolve,reject)=>{
      forceResolve = resolve

        const video = youtubedl(url.href,
        ['--format=18'],
        { cwd: __dirname })
        video.on('info', function(info) {
          songInfo = info
            console.log('Download started')
            let file = `../songs/${info._filename}`
            video.pipe(fs.createWriteStream(`${info._filename}`))
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size)
          })
          video.on('end',(endInfo)=>{
            forceResolve.bind(this)
          });
        })
        return promise     
}