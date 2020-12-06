import os
import sys
from requirements import youtube_dl 
from requirements import boto3

import helper

S3_BUCKET = os.environ.get('S3_BUCKET')
DYNAMO_DB_TABLE = os.environ.get('DYNAMODB_TABLE')
# Get the service resource.
dynamodb = boto3.resource('dynamodb')
s3 = boto3.resource('s3')
s3Client = boto3.client('s3')

table = dynamodb.Table(DYNAMO_DB_TABLE)
bucket = s3.Bucket(S3_BUCKET)



def listSongs(event, context):
    songs = table.scan()['Items']
    return helper.packageResponse(songs)

def uploadSong(event, context):
    source = event['pathParameters']['source']
    song = 'Nothing'
    if(source == 'youtube'):
            videoId = event['queryStringParameters']['video']
            song = uploadSongFromYoutube(videoId)

    return helper.packageResponse(song)

def uploadSongFromYoutube(videoId):
    url = 'https://www.youtube.com/watch?v=' + videoId
    root_folder = '' if sys.platform == 'win32' else '/tmp/'
    filename = root_folder + 'videos/' + videoId + '.mp4'
    ydl_opts = {
    'outtmpl': filename
}
    with youtube_dl.YoutubeDL(ydl_opts) as ydl:
            songInfo = ydl.extract_info(url, download=True)
            title = songInfo['title']
            key = videoId
            songImage = songInfo['thumbnails'].pop()['url']

            song = {
                'id' : key,
                'videoId':videoId,
                'title' : title,
                'image' : songImage,
                'cloudUrl': format_cloudUrl(key)
            }
            s3.meta.client.upload_file(filename, S3_BUCKET, key, ExtraArgs={'ACL': 'public-read','ContentType': 'video/mp4'})
            table.put_item(Item=song)

            return song
def format_cloudUrl(key):
    return 'https://{}.s3.eu-central-1.amazonaws.com/{}'.format(S3_BUCKET,key)