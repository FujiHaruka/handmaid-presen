import './EditView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {Layout} from 'antd'
import {
  SlideListPane,
} from '../components'

const {Sider, Content} = Layout

class EditView extends Component {
  render () {
    const {
      slides,
      slidesArray,
      prepareNewSlide,
      setEdittingSlide,
    } = this.props
    return (
      <Layout className='EditView'>
        <Sider className='EditView-sider'>
          <SlideListPane
            {...{
              slidesArray,
              prepareNewSlide,
              setEdittingSlide,
            }}
          />
        </Sider>
        <Content className='EditView-content'>
          moooooooo
        </Content>
      </Layout>
    )
  }
}

export default asView(EditView)
