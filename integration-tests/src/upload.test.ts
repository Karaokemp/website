import fetch from 'node-fetch'

const INTEGRATION_URL = 'https://ydzcg19u56.execute-api.eu-central-1.amazonaws.com'
import { AssertionError } from 'assert';
import { assert } from 'console';
import {KaraokempSong} from '../../frontend/src/types'

const BAD_TOUCH_VIDEO_ID = 'AUjmpbd-U2Q'
const BAD_YOUCH_TITLE = 'The Bad Touch - The Bloodhound Gang | Karaoke Version | KaraFun'

let connectionError = false




describe('Upload requests of Youtube songs', () => {


    test("should show the right details in the response", async () => {
        fetch(`${INTEGRATION_URL}/songs/youtube?video=${BAD_TOUCH_VIDEO_ID}`,{method:'POST'})
        .then(response => {
            expect(response.ok).toBeTruthy()
            return response.json()
        }).then(result=>{
            const cloudSong: KaraokempSong = new KaraokempSong(result.videoId,result.title,result.image,result.cloudUrl)
            fetch(cloudSong.cloudUrl).then(response=>{
                expect(response.ok).toBeTruthy()
            })
            expect(cloudSong.title).toBe(BAD_YOUCH_TITLE)
            expect(connectionError).toBeFalsy()

        }).catch(()=>{
            expect(true).toBe(false)
        }).finally(()=>{
            deleteSong(BAD_TOUCH_VIDEO_ID)
        })
       
    });
});

function deleteSong(key:string){
    fetch(`https://hmuhmxob6b.execute-api.eu-central-1.amazonaws.com/songs?song=${key}`,{method: 'DELETE'}).catch((err:any)=>{
    })

}