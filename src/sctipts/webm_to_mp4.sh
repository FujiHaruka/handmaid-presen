#!/bin/bash -e

webm_video=$1
mp4_video=`echo $1 | sed s/webm$/mp4/`

rm -f $mp4_video
ffmpeg -loglevel error -i $webm_video -r 30 -vcodec libx264 -an $mp4_video
rm $webm_video
