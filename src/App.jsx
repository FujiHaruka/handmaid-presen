import React, { Component } from 'react'
import './App.css'
import {
  projectStore,
  viewStore,
  mediaStore,
  slideStore,
} from './stores'
import {
  EditView,
  SettingView,
  PresentationView
} from './views'
import {
  Menu
} from './components'
import {Layout} from 'antd'
import {ViewPage} from './Consts'
import {compose} from 'recompose'

const {Header, Content} = Layout

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
      setViewPage
    } = props
    return (
      <Layout className='App'>
        <Header className='App-header'>
          <Menu {...{viewPage, setViewPage}} />
        </Header>
        <Content className='App-view'>
          <View {...props} />
        </Content>
      </Layout>
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
  slideStore,
  mediaStore,
  viewStore,
)(App)
