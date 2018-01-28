import React, { Component } from 'react'
import './App.css'
import {
  EditView,
  SettingView,
  PresentationView,
  AssetView,
  RecordingView,
} from './views'
import {
  Menu,
} from './components'
import {Layout} from 'antd'
import {ViewPage} from './Consts'
import {connecStore} from './store'
import {pure, compose} from 'recompose'
import {onlyIf} from './wrappers'

const {Header, Content} = Layout

const View = (props) => {
  switch (props.viewPage) {
    case ViewPage.SETTINGS_PAGE:
      return <SettingView {...props} />
    case ViewPage.EDIT_PAGE:
      return <EditView {...props} />
    case ViewPage.PRESENTATION_PAGE:
      return <PresentationView {...props} />
    case ViewPage.ASSET_PAGE:
      return <AssetView {...props} />
    case ViewPage.RECORDING_PAGE:
      return <RecordingView {...props} />
    default:
      throw new Error(`No such view page as ${props.viewPage}`)
  }
}

const AppHeader = compose(
  pure,
  onlyIf('visible')
)(({viewPage, setViewPage}) => (
  <Header className='App-header'>
    <Menu {...{viewPage, setViewPage}} />
  </Header>
))

class App extends Component {
  render () {
    const {props} = this
    const {
      visibleHeader,
      viewPage,
      setViewPage
    } = props
    return (
      <Layout className='App'>
        <AppHeader visible={visibleHeader} {...{viewPage, setViewPage}} />
        <Content className='App-view'>
          <View {...props} />
        </Content>
      </Layout>
    )
  }

  async componentDidMount () {
    const {
      syncProject,
      syncAsset,
      syncSlide,
    } = this.props
    await syncProject()
    const {projectName, setViewPage} = this.props
    if (!projectName) {
      setViewPage(ViewPage.SETTINGS_PAGE)
    }
    await syncAsset()
    await syncSlide()
  }
}

export default connecStore(App)
