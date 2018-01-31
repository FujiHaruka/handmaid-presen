import './EditView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {Layout} from 'antd'
import {
  SlideListPane,
  SlideEditPane,
} from '../components'

const {Sider, Content} = Layout

class EditView extends Component {
  render () {
    const {
      slides,
      edittingSlide,
      slidesArray,
      prepareNewSlide,
      setEdittingSlideId,
      assetTabKey,
      setAssetTabKey,
      assetPhotos,
      assetVideos,
      selectAssetAsSlide,
      deleteEdittingSlide,
    } = this.props
    return (
      <Layout className='EditView'>
        <Sider className='EditView-sider'>
          <SlideListPane
            {...{
              edittingSlide,
              slidesArray,
              prepareNewSlide,
              setEdittingSlideId,
            }}
          />
        </Sider>
        <Content className='EditView-content'>
          <SlideEditPane
            slide={edittingSlide}
            {...{
              assetTabKey,
              setAssetTabKey,
              assetPhotos,
              assetVideos,
              selectAssetAsSlide,
              deleteEdittingSlide,
            }}
          />
        </Content>
      </Layout>
    )
  }
}

export default asView(EditView)
