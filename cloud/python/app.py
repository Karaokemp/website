import json
import youtube_dl 

ydl_opts = {
    'outtmpl': '/tmp/videos/video.mp4'
} 

def upload(event, context):
    download('AUjmpbd-U2Q')
    return {
        "statusCode": 200,
        "body": json.dumps(event)
    }

def download(videoId): 
    link = 'https://www.youtube.com/watch?v=' + videoId
    with youtube_dl.YoutubeDL(ydl_opts) as ydl: 
	    ydl.download([link])