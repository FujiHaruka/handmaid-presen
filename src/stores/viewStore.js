import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'
import {
  ViewPage,
  AssetPageTab,
} from '../Consts'
import {ok} from '../helpers/nodejs'

class ViewStore {
  static initial (props) {
    return {
      viewPage: ViewPage.EDIT_PAGE,
      edittingSlide: null,
      assetTabKey: AssetPageTab.VIDEO,
      visibleAssetDeletingModal: false,
      visibleHeader: true,
      deletingAsset: null,
      savingPaintVideo: false,
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
    setSavingPaintVideo: updaterOf('savingPaintVideo'),
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
