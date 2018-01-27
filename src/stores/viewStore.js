import {updaterOf} from '@self/helpers'
import {asStore} from '@self/wrappers'

export const ViewPage = {
  INIT_PAGE: 'INIT_PAGE',
  EDIT_PAGE: 'EDIT_PAGE',
  PRESENTATION_PAGE: 'PRESENTATION_PAGE',
}

class ViewStore {
  static initial (props) {
    return {
      viewPage: ViewPage.EDIT_PAGE
    }
  }

  static computed (props) {
    return {}
  }

  static updaters = {
    setViewPageToInit: () => () => ({viewPage: ViewPage.INIT_PAGE}),
    setViewPageToEdit: () => () => ({viewPage: ViewPage.EDIT_PAGE}),
    setViewPageToPresentation: () => () => ({viewPage: ViewPage.PRESENTATION_PAGE})
  }

  static actions = {

  }
}

export default asStore(ViewStore)
