import { Song,KaraokempSong} from "../types";

const KARAOKEMP_API = process.env.REACT_APP_KARAOKEMP_API
const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY

export default class{

      static async getYoutubeResults(term:string) : Promise<Song[]>{
            let results = new Array<Song>()
            await fetch(`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&type=video&q=${term}&part=snippet&fields=items(id/videoId,snippet/title)&maxResults=3`)
            .then(res => res.json())
            .then((response:{items:{id:{videoId:string},snippet:{title:string}}[]}) => {
            const songs = response.items.map(item=>new Song(item.id.videoId,item.snippet.title))
            results = songs
            }).catch(err=>{
                  console.error(err.message)
            })
      return results
      }
      static async getBucketSongs(): Promise<KaraokempSong[]>{
            let bucketSongs = new Array<KaraokempSong>()

            await fetch(`${KARAOKEMP_API}/songs`)
            .then(res => res.json())
            .then((objects:KaraokempSong[]) => {
            let songs = objects.map(obj=> new KaraokempSong(obj.videoId,obj.title,obj.cloudUrl))
            bucketSongs = songs
            });
      return bucketSongs;
      }
}