import promisify from 'es6-promisify'

const fs = window.require('fs')
const childProcess = window.require('child_process')
const unlink = promisify(fs.unlink)
const exec = promisify(childProcess.exec)
const existsFile = (path) => new Promise((resolve) => {
  fs.stat(path, (err) => err ? resolve(false) : resolve(true))
})

async function createThumbnailFromLastFrom (videoSrc) {
  const pictureDest = videoSrc.replace(/mp4$/, 'jpg')

  const existsOld = await existsFile(pictureDest)
  if (existsOld) {
    await unlink(pictureDest)
  }
  let lastFrame = await exec(`ffprobe -show_streams "${videoSrc}" 2> /dev/null | grep nb_frames | head -1 | cut -d \\= -f 2`)
  lastFrame -= 1
  await exec(`ffmpeg -i ${videoSrc} -vf select=\\'eq\\(n,${lastFrame}\\) -s 640x360 -vframes 1 ${pictureDest}`)
  return pictureDest
}

export default createThumbnailFromLastFrom
