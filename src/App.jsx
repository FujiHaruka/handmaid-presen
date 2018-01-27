import React, { Component } from 'react'
import './App.css'
import {
  projectStore,
  viewStore
} from './stores'
import {
  EditView,
  SettingView,
  PresentationView,
} from './views'
import {
  Menu
} from './components'
import {ViewPage} from './Consts'
import {compose} from 'recompose'

const View = (props) => {
  switch (props.viewPage) {
    case ViewPage.SETTINGS_PAGE:
      return <SettingView {...props} />
    case ViewPage.EDIT_PAGE:
      return <EditView {...props} />
    case ViewPage.PRESENTATION_PAGE:
      return <PresentationView {...props} />
    default:
      throw new Error(`No such view page as ${props.viewPage}`)
  }
}

class App extends Component {
  render () {
    const {props} = this
    const {
      viewPage,
      setViewPage,
    } = props
    return (
      <div className='App'>
        <Menu {...{viewPage, setViewPage}} />
        <View {...props} />
      </div>
    )
  }

  async componentDidMount () {
    const {syncProject} = this.props
    await syncProject()
    const {projectName, setViewPage} = this.props
    if (!projectName) {
      setViewPage(ViewPage.SETTINGS_PAGE)
    }
  }
}

export default compose(
  projectStore,
  viewStore,
)(App)
