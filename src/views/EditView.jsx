import './EditView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {Layout} from 'antd'
import {
  SlideEditPane,
} from '../components'

const {Sider, Content} = Layout

class EditView extends Component {
  render () {
    const {
      slides,
      slidesArray,
      prepareNewSlide = () => {},
    } = this.props
    return (
      <Layout className='EditView'>
        <Sider className='EditView-sider'>
          <SlideEditPane
            {...{
              slidesArray,
              prepareNewSlide
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
