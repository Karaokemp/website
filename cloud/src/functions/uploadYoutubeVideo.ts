import  youtubedl from 'youtube-dl'
import packageResponse from '../helpers/packageResponse'
export default async function uploadYoutubeVideo(videoId:string){
    return packageResponse(`need to upload video ${videoId} from youtube!`)
   }
  
  