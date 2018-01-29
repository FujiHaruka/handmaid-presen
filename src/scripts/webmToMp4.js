import {
  unlink,
  exec,
  existsFile,
} from '../helpers/nodejs'

async function webmToMp4 (webmSrc) {
  const mp4Dest = webmSrc.replace(/webm$/, 'mp4')
  const existsOld = await existsFile(mp4Dest)
  if (existsOld) {
    await unlink(mp4Dest)
  }
  await exec(`ffmpeg -loglevel error -i ${webmSrc} -r 30 -vcodec libx264 -an ${mp4Dest}`)
  await unlink(webmSrc)
  return mp4Dest
}

export default webmToMp4
