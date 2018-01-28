import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'
import {
  ViewPage,
  AssetPageTab,
} from '../Consts'

const {ok} = window.require('assert')

class ViewStore {
  static initial (props) {
    return {
      viewPage: ViewPage.ASSET_PAGE,
      edittingSlide: null,
      assetTabKey: AssetPageTab.VIDEO,
      visibleAssetDeletingModal: false,
      visibleHeader: true,
      deletingAsset: null,
    }
  }

  static computed (props) {
    return {}
  }

  static updaters = {
    setViewPage: updaterOf('viewPage'),
    setEdittingSlide: updaterOf('edittingSlide'),
    setAssetTabKey: updaterOf('assetTabKey'),
    setVisibleAssetDeletingModal: updaterOf('visibleAssetDeletingModal'),
    setVisibleHeader: updaterOf('visibleHeader'),
    setDeletingAsset: updaterOf('deletingAsset'),
  }

  static actions = {
    prepareDeleteAsset: ({setVisibleAssetDeletingModal, setDeletingAsset}) => (asset) => {
      ok(asset.id)
      setDeletingAsset(asset)
      setVisibleAssetDeletingModal(true)
    }
  }
}

export default asStore(ViewStore)
