import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'
import {ViewPage} from '../Consts'

class ViewStore {
  static initial (props) {
    return {
      viewPage: ViewPage.EDIT_PAGE,
      edittingSlide: null,
    }
  }

  static computed (props) {
    return {}
  }

  static updaters = {
    setViewPage: updaterOf('viewPage'),
    setEdittingSlide: updaterOf('edittingSlide'),
  }

  static actions = {

  }
}

export default asStore(ViewStore)
