import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'

export const ViewPage = {
  SETTINGS_PAGE: 'SETTINGS_PAGE',
  EDIT_PAGE: 'EDIT_PAGE',
  PRESENTATION_PAGE: 'PRESENTATION_PAGE',
}

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
