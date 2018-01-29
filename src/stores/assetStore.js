import {updaterOf, syncFromDb, uid} from '../helpers'
import {asStore} from '../wrappers'
import {Asset} from '../models'
import {ProjectDirs, AssetType} from '../Consts'
import promisify from 'es6-promisify'
import toBuffer from 'blob-to-buffer'

const fs = window.require('fs')
const mkdirp = (path) => new Promise((resolve) => {
  fs.mkdir(path, (e) => resolve())
})
const copy = (src, dest) => new Promise((resolve, reject) => {
  const read = fs.createReadStream(src)
  const write = fs.createWriteStream(dest)
  read.on('error', reject)
  write.on('error', reject)
  write.on('close', resolve)
  read.pipe(write)
})
const writeFile = promisify(fs.writeFile)
const unlink = promisify(fs.unlink)
const {join, extname} = window.require('path')
const toBufferAsync = promisify(toBuffer)

const {ok} = require('assert')

class AssetStore {
  static initial (props) {
    return {
      assets: {}
    }
  }

  static computed (props) {
    const {assets} = props
    const assetPhotos = Object.keys(assets)
      .map((id) => assets[id])
      .filter(({assetType}) => assetType === AssetType.PHOTO)
      .sort((a, b) => a.createdAt - b.createdAt)
    const assetVideos = Object.keys(assets)
      .map((id) => assets[id])
      .filter(({assetType}) => assetType === AssetType.VIDEO)
      .sort((a, b) => a.createdAt - b.createdAt)
    return {
      assetPhotos,
      assetVideos,
    }
  }

  static updaters = {
    setAsset: updaterOf('assets')
  }

  static actions = {
    syncAsset: ({setAsset}) => async () => {
      await syncFromDb({
        set: setAsset,
        db: Asset
      })
    },
    addAsset: ({assets, setAsset}) => async (asset) => {
      const created = await Asset.create(asset)
      await syncFromDb({
        set: setAsset,
        db: Asset
      })
      return created
    },
    deleteAsset: ({assets, setAsset}) => async (id) => {
      const asset = assets[id]
      if (!asset) {
        throw new Error(`No such asset as id = "${id}"`)
      }
      await Asset.delete(id)
      await syncFromDb({
        set: setAsset,
        db: Asset
      })
      // TODO hock で処理したいよね
      await unlink(join(window.globals.projectDir, asset.path))
    },
    addNewPhotoAsAsset: ({assets, setAsset}) => async (srcPath) => {
      const {projectDir} = window.globals
      ok(projectDir)
      const filename = uid() + extname(srcPath)
      const assetPath = join(ProjectDirs.ASSETS, filename)
      const assetFullPath = join(projectDir, assetPath)
      await mkdirp(join(projectDir, ProjectDirs.ASSETS))
      await copy(srcPath, assetFullPath)
      const created = await Asset.create({
        assetType: AssetType.PHOTO,
        path: assetPath,
      })
      await syncFromDb({
        set: setAsset,
        db: Asset,
      })
      return created
    },
    addNewVideoAsAsset: ({assets, setAsset}) => async (blob) => {
      ok(blob)
      const {projectDir} = window.globals
      ok(projectDir)
      const filename = uid() + '.webm'
      const assetPath = join(ProjectDirs.ASSETS, filename)
      const assetFullPath = join(projectDir, assetPath)
      await mkdirp(join(projectDir, ProjectDirs.ASSETS))
      const buffer = await toBufferAsync(blob)
      await writeFile(assetFullPath, buffer)
      const created = await Asset.create({
        assetType: AssetType.VIDEO,
        path: assetPath,
      })
      await syncFromDb({
        set: setAsset,
        db: Asset,
      })
      return created
    },
  }
}

export default asStore(AssetStore)
