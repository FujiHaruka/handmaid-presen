import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'
import {ViewPage} from '../Consts'

class ViewStore {
  static initial (props) {
    return {
      // viewPage: ViewPage.EDIT_PAGE
      viewPage: ViewPage.SETTINGS_PAGE,
    }
  }

  static computed (props) {
    return {}
  }

  static updaters = {
    setViewPage: updaterOf('viewPage')
  }

  static actions = {

  }
}

export default asStore(ViewStore)
