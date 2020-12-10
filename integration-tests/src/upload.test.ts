import fetch from 'node-fetch'

const INTEGRATION_URL = 'https://ydzcg19u56.execute-api.eu-central-1.amazonaws.com'
import { AssertionError } from 'assert';
import { assert } from 'console';
import {KaraokempSong} from '../../frontend/src/types'

const BAD_TOUCH_VIDEO_ID = 'AUjmpbd-U2Q'
const BAD_YOUCH_TITLE = 'The Bad Touch - The Bloodhound Gang | Karaoke Version | KaraFun'



describe('Upload requests of Youtube songs', () => {

    test("should show the right details in the response", async () => {
        fetch(`${INTEGRATION_URL}/songs/youtube?video=${BAD_TOUCH_VIDEO_ID}`,{method:'POST'})
        .then(response => {
            expect(response.ok).toBeTruthy()
            return response.json()
        }).then(result=>{
            const cloudSong: KaraokempSong = new KaraokempSong(result.videoId,result.title,result.image,result.cloudUrl)
            expect(cloudSong.title).toBe(BAD_YOUCH_TITLE)
            test('should give valid URL to the song on the cloud', async ()=>{
                const response = await fetch(cloudSong.cloudUrl)
                expect(response.ok).toBeTruthy()
            })

        }).finally(()=>{
            fetch(`https://hmuhmxob6b.execute-api.eu-central-1.amazonaws.com/songs?song=${BAD_TOUCH_VIDEO_ID}`,{method: 'DELETE'})
        })
       
    });
});