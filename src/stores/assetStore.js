import {updaterOf, syncFromDb, uid} from '../helpers'
import {asStore} from '../wrappers'
import {Asset} from '../models'
import {ProjectDirs, AssetType} from '../Consts'
import promisify from 'es6-promisify'
import toBuffer from 'blob-to-buffer'
import webmToMp4 from '../scripts/webmToMp4'
import createThumbnailFromLastFrom from '../scripts/createThumbnailFromLastFrom'
import {
  copy,
  writeFile,
  unlink,
  mkdirp,
  join,
  extname,
  ok,
} from '../helpers/nodejs'

const toBufferAsync = promisify(toBuffer)

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
      const {projectDir} = window.globals
      await unlink(join(projectDir, asset.path))
      if (asset.thumbnailPath) {
        await unlink(projectDir, asset.thumbnailPath)
      }
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
      await mkdirp(join(projectDir, ProjectDirs.ASSETS))
      const name = uid()
      const webmName = name + '.webm'
      const mp4Name = name + '.mp4'
      const webmFullPath = join(projectDir, ProjectDirs.ASSETS, webmName)
      const assetPath = join(ProjectDirs.ASSETS, mp4Name)
      const assetFullPath = join(projectDir, assetPath)
      const thumbnailPath = join(ProjectDirs.ASSETS, name + '.jpg')
      const buffer = await toBufferAsync(blob)

      await writeFile(webmFullPath, buffer)
      await webmToMp4(webmFullPath)
      await createThumbnailFromLastFrom(assetFullPath)

      const created = await Asset.create({
        assetType: AssetType.VIDEO,
        path: assetPath,
        thumbnailPath
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
