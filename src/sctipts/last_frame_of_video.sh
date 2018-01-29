#!/bin/bash -e

src_video="$1"
dest_picture=`echo $1 | sed s/mp4$/jpg/`
size="640x360"

lf=`ffprobe -show_streams "$src_video" 2> /dev/null | grep nb_frames | head -1 | cut -d \= -f 2`
rm -f "$dest_picture"
let "lf = $lf - 1"
ffmpeg -i $src_video -vf select=\'eq\(n,$lf\) -s $size -vframes 1 $dest_picture
