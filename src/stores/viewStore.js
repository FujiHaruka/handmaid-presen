import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'
import {
  ViewPage,
  AssetPageTab,
} from '../Consts'

class ViewStore {
  static initial (props) {
    return {
      viewPage: ViewPage.ASSET_PAGE,
      edittingSlide: null,
      assetTabKey: AssetPageTab.PHOTO,
    }
  }

  static computed (props) {
    return {}
  }

  static updaters = {
    setViewPage: updaterOf('viewPage'),
    setEdittingSlide: updaterOf('edittingSlide'),
    setAssetTabKey: updaterOf('assetTabKey'),
  }

  static actions = {

  }
}

export default asStore(ViewStore)
