const fs = require('fs')
const youtubedl = require('youtube-dl')
const { resolve } = require('path')
 
const video = youtubedl('https://www.youtube.com/watch?v=OhRUYf_yn_s',
  // Optional arguments passed to youtube-dl. 
  ['--format=18'],
  // Additional options can be given for calling `child_process.execFile()`.
  { cwd: __dirname })
 
// Will be called when the download starts.
video.on('info', function(info) {
  let fileName = info._filename
  console.log('Download started')
  let file = `../songs/${info._filename}`
  video.pipe(fs.createWriteStream(`../songs`))
  console.log('filename: ' + info._filename)
  console.log('size: ' + info.size)
})
 video.on('complete',()=>{
   resolve(fileName)
 })
