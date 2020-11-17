import os
import json
from requirements import youtube_dl 
from requirements import boto3

import helper

S3_BUCKET = os.environ.get('S3_BUCKET')

s3 = boto3.resource('s3')

def listSongs(event, context):
    bucket = s3.Bucket(S3_BUCKET)
    songs = list()
    for obj in bucket.objects.all():
        songs.append(obj.key)
    return packageResponse(songs)

def uploadSong(event, context):
    source = event['pathParameters']['source']
    payload = 'Nothing'
    if(source == 'youtube'):
            videoId = event['queryStringParameters']['video']
            payload = uploadSongFromYoutube(videoId)
    return packageResponse(payload)

def packageResponse(payload):
    return {
        "statusCode": 200,
        "body": json.dumps(payload)
    }
def uploadSongFromYoutube(videoId):
    url = 'https://www.youtube.com/watch?v=' + videoId
    filename = '/tmp/videos/' + videoId + '.mp4'
    ydl_opts = {
    'outtmpl': filename
}
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            songInfo = ydl.extract_info(url, download=True)
            key = helper.format_filename(songInfo['title'])
            #key = videoId + '.mp4'
            s3.meta.client.upload_file(filename, S3_BUCKET, key, ExtraArgs={'ACL': 'public-read','ContentType': 'video/mp4','Metadata':{'secret':'Tusik!'}})
            return {
                'title' : songInfo['title'],
                'videoId': videoId
            }