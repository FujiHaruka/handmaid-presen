import promisify from 'es6-promisify'

const fs = window.require('fs')
const childProcess = window.require('child_process')
const unlink = promisify(fs.unlink)
const exec = promisify(childProcess.exec)
const existsFile = (path) => new Promise((resolve) => {
  fs.stat(path, (err) => err ? resolve(false) : resolve(true))
})

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
