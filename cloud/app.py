import os
import json
from requirements import youtube_dl 
from requirements import boto3

S3_BUCKET = os.environ.get('S3_BUCKET')

s3 = boto3.resource('s3')

def listSongs(event, context):
    bucket = s3.Bucket(S3_BUCKET)
    songs = list()
    for obj in bucket.objects.all():
        songs.append(obj.key)
    return packageResponse(songs)

def upload(event, context):
    download('AUjmpbd-U2Q')
    return packageResponse(event)

def download(videoId):
    filename = '/tmp/videos/video.mp4'
    ydl_opts = {
    'outtmpl': filename
} 
    link = 'https://www.youtube.com/watch?v=' + videoId
    with youtube_dl.YoutubeDL(ydl_opts) as ydl: 
	    ydl.download([link])
    s3.meta.client.upload_file(filename, 'kcs-test-karaoke-songs', 'video.mp4')

def packageResponse(payload):
    return {
        "statusCode": 200,
        "body": json.dumps(payload)
    }
response = listSongs({},{})
print(response)