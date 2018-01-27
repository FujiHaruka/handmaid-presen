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
import {ViewPage} from './stores/viewStore'
import {compose} from 'recompose'

class App extends Component {
  render () {
    const {props} = this
    switch (props.viewPage) {
      case ViewPage.SETTINGS_PAGE:
        return (
          <div className='App'>
            <SettingView {...props} />
          </div>
        )
      case ViewPage.EDIT_PAGE:
        return (
          <div className='App'>
            <EditView {...props} />
          </div>
        )
      case ViewPage.PRESENTATION_PAGE:
        return (
          <div className='App'>
            <PresentationView {...props} />
          </div>
        )
      default:
        throw new Error(`No such view page as ${props.viewPage}`)
    }
  }

  async componentDidMount () {
    const {syncProject} = this.props
    await syncProject()
    const {projectName, setViewPageToInit} = this.props
    if (!projectName) {
      setViewPageToInit()
    }
  }
}

export default compose(
  projectStore,
  viewStore,
)(App)
