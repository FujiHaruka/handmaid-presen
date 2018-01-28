import {updaterOf, syncFromDb} from '../helpers'
import {asStore} from '../wrappers'
import {Asset} from '../models'

class AssetStore {
  static initial (props) {
    return {
      assets: {}
    }
  }

  static computed (props) {
    return {}
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
    removeAsset: ({assets, setAsset}) => async (id) => {
      const asset = assets[id]
      if (!asset) {
        throw new Error(`No such asset as id = "${id}"`)
      }
      await Asset.delete(id)
      await syncFromDb({
        set: setAsset,
        db: Asset
      })
    }
  }
}

export default asStore(AssetStore)
