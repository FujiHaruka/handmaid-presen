import React, { Component } from 'react'
import './App.css'
import {
  projectStore,
  ViewStore
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
      case ViewPage.INIT_PAGE:
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
  ViewStore,
)(App)
