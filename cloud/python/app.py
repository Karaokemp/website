import json
import youtube_dl 
import boto3

def upload(event, context):
    download('AUjmpbd-U2Q')
    return {
        "statusCode": 200,
        "body": json.dumps(event)
    }

def download(videoId):
    filename = '/tmp/videos/video.mp4'
    ydl_opts = {
    'outtmpl': filename
} 
    link = 'https://www.youtube.com/watch?v=' + videoId
    with youtube_dl.YoutubeDL(ydl_opts) as ydl: 
	    ydl.download([link])
    s3 = boto3.resource('s3')
    s3.meta.client.upload_file(filename, 'kcs-test-karaoke-songs', 'video.mp4')