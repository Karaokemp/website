import json
from requirements import youtube_dl 
from requirements import boto3

s3 = boto3.resource('s3')

def listSongs(event, context):
    response = s3.meta.client.list_objects_v2(
    Bucket='kcs-test-karaoke-songs',
)
    songs = list(map(lambda x: x['Key'],response['Contents']))
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
