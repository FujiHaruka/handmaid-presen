import './RecordingView.css'
import React, {Component} from 'react'
import {asView, onlyIf} from '../wrappers'
import {Button, Spin} from 'antd'
import {
  PaintToolBar,
  PaintCanvas,
} from '../components'

const SavingSpin = onlyIf('visible')(() => (
  <div className='RecordingView-spin-wrapper'>
    <Spin
      className='RecordingView-spin'
      size='large'
    />
  </div>
))

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
      savingPaintVideo,
      setPaintDrawing,
      setPaintPrevCoord,
      startPaintClearing,
      startPaintRecording,
      finishPaintClearing,
      finishPaintRecording,
      pushPaintCurveCoords,
      clearPaintCurveCoords,
      addNewVideoAsAsset,
      setSavingPaintVideo,
    } = props
    return (
      <div className='RecordingView'>
        <div className='RecordingView-quit'>
          <Button shape='circle' icon='left' onClick={quitRecordingView} />
        </div>

        <PaintToolBar {...{
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
          addNewVideoAsAsset,
          setSavingPaintVideo,
        }} />

        <SavingSpin visible={savingPaintVideo} />
      </div>
    )
  }
}

export default asView(RecordingView)
