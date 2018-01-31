import './SlideEditToolBar.css'
import React from 'react'
import {pure} from 'recompose'
import {Button} from 'antd'

const SlideEditToolBar = ({
  onRemoveSlide,
  onRemoveAsset,
}) => (
  <div className='SlideEditToolBar'>
    <Button
      className='SlideEditToolBar-button'
      onClick={onRemoveSlide}
    >REMOVE</Button>
    <Button
      className='SlideEditToolBar-button'
      onClick={onRemoveAsset}
    >RESET</Button>
  </div>
)

export default pure(SlideEditToolBar)
