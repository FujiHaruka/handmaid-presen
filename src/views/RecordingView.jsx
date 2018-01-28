import './RecordingView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {Button} from 'antd'
import {
  PaintToolbar,
  PaintCanvas,
} from '../components'

class RecordingView extends Component {
  render () {
    const {props} = this
    const {
      quitRecordingView,
      paintDrawing,
      paintPrevCoord,
      paintClearing,
      paintRecording,
      paintCurveCoords,
      setPaintDrawing,
      setPaintPrevCoord,
      startPaintClearing,
      startPaintRecording,
      finishPaintClearing,
      finishPaintRecording,
      pushPaintCurveCoords,
      clearPaintCurveCoords,
    } = props
    return (
      <div className='RecordingView'>
        <div className='RecordingView-quit'>
          <Button shape='circle' icon='left' onClick={quitRecordingView} />
        </div>

        <PaintToolbar {...{
          paintRecording,
          startPaintRecording,
          finishPaintRecording,
          startPaintClearing,
        }} />
        <PaintCanvas {...{
          paintDrawing,
          paintPrevCoord,
          paintClearing,
          paintRecording,
          paintCurveCoords,
          setPaintDrawing,
          setPaintPrevCoord,
          pushPaintCurveCoords,
          clearPaintCurveCoords,
          finishPaintClearing,
        }} />
      </div>
    )
  }
}

export default asView(RecordingView)
