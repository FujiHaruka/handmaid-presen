import './PaintToolBar.css'
import React from 'react'
import {pure} from 'recompose'
import {Button} from 'antd'

const PaintToolBar = ({
  paintRecording,
  startPaintRecording,
  finishPaintRecording,
  startPaintClearing,
}) => (
  <div className='PaintToolBar'>
    <span className='PaintToolBar-button'>
      <Button
        type='primary'
        onClick={paintRecording ? finishPaintRecording : startPaintRecording}
      >
        {paintRecording ? 'FINISH' : 'RECORD'}
      </Button>
    </span>
    <span className='PaintToolBar-button'>
      <Button
        onClick={startPaintClearing}>
        CLEAR
      </Button>
    </span>
    <span className='PaintToolBar-message'>
      <span className='PaintToolBar-message-inner'>
        {paintRecording && 'Recording...'}
      </span>
    </span>
  </div>
)

export default pure(PaintToolBar)
