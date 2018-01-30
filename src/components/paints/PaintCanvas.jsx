import './PaintCanvas.css'
import React, {Component} from 'react'
import {message} from 'antd'

const enabledOf = (name) => (prev, next) => !prev[name] && next[name]
const disabledOf = (name) => (prev, next) => prev[name] && !next[name]
const whenStartClearing = enabledOf('paintClearing')
const whenStartRecording = enabledOf('paintRecording')
const whenFinishRecording = disabledOf('paintRecording')

const CANVAS_WIDTH = 1920
const CANVAS_HEIGHT = 1080

const SKIP_FOR_SMOOTH = 4

const lineStyle = (ctx, settings = {}) => {
  const {color = '#222'} = settings
  ctx.lineCap = 'round'
  ctx.strokeStyle = color
  ctx.lineWidth = 3
}

class PaintCanvas extends Component {
  render () {
    return (
      <div className='PaintCanvas'>
        <canvas
          id='PaintCanvas-main'
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={(c) => { this.canvas = c }}
          onMouseDown={this.startDrawing}
          onMouseUp={this.finishDrawing}
          onMouseMove={this.keepDrawing}
          onMouseLeave={this.finishDrawing}
        />
        <canvas
          id='PaintCanvas-hidden'
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={(c) => { this.hiddenCanvas = c }}
        />
      </div>
    )
  }

  componentDidMount () {
    this.canvasCtx = this.canvas.getContext('2d')
    this.hiddenCanvasCtx = this.hiddenCanvas.getContext('2d')
    this.recordedBlobs = []
    this.clear()
  }

  componentDidUpdate (prevProps) {
    const {props} = this
    if (whenStartClearing(prevProps, props)) {
      this.clear()
      props.finishPaintClearing()
    }
    if (whenStartRecording(prevProps, props)) {
      this.startRecord()
    }
    if (whenFinishRecording(prevProps, props)) {
      this.stopRecordAndSave()
    }
  }

  startDrawing = (e) => {
    const {setPaintDrawing, setPaintPrevCoord, clearPaintCurveCoords, pushPaintCurveCoords} = this.props
    const {top, left} = e.target.getBoundingClientRect()
    const coord = {
      x: e.clientX - left,
      y: e.clientY - top
    }
    setPaintPrevCoord(coord)
    setPaintDrawing(true)
    clearPaintCurveCoords()
    pushPaintCurveCoords(coord)
    this.saveCanvasState()
  }

  finishDrawing = (e) => {
    const {paintDrawing, setPaintDrawing, clearPaintCurveCoords} = this.props
    if (paintDrawing) {
      setPaintDrawing(false)
      this.replaceSmoothCurve()
      clearPaintCurveCoords()
    }
  }

  keepDrawing = (e) => {
    const {paintDrawing, setPaintPrevCoord, paintPrevCoord, pushPaintCurveCoords} = this.props
    if (!paintDrawing) {
      return
    }
    const {top, left} = e.target.getBoundingClientRect()
    const coord = {
      x: e.clientX - left,
      y: e.clientY - top
    }
    this.drawLine(paintPrevCoord, coord)
    setPaintPrevCoord(coord)
    pushPaintCurveCoords(coord)
  }

  drawLine (from, to) {
    const ctx = this.canvasCtx
    lineStyle(ctx)
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
    ctx.closePath()
  }

  clear () {
    const {width, height} = this.canvas
    const ctx = this.canvasCtx
    // fill white
    ctx.clearRect(0, 0, width, height)
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, width, height)
    this.saveCanvasState()
  }

  startRecord () {
    const stream = this.canvas.captureStream(30)
    const mediaRecorder = new window.MediaRecorder(stream, {mimeType: 'video/webm'})
    mediaRecorder.start(100) // 100ms
    mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.recordedBlobs.push(e.data)
      }
    }
    this.mediaRecorder = mediaRecorder
  }

  stopRecordAndSave () {
    const {mediaRecorder, props} = this
    if (!mediaRecorder) {
      return
    }
    mediaRecorder.onstop = async () => {
      props.setSavingPaintVideo(true)
      const {Blob} = window
      const blob = new Blob(this.recordedBlobs, {type: 'video/webm'})
      try {
        await props.addNewVideoAsAsset(blob)
        message.success('Video saved.')
      } catch (e) {
        message.error('Failed to save video.')
        console.error(e)
      } finally {
        props.setSavingPaintVideo(false)
      }
      // clean up
      this.recordedBlobs = []
      this.mediaRecorder = null
    }
    mediaRecorder.stop()
  }

  saveCanvasState () {
    const {canvas, canvasCtx, hiddenCanvasCtx} = this
    const {width, height} = canvas
    const img = canvasCtx.getImageData(0, 0, width, height)
    hiddenCanvasCtx.putImageData(img, 0, 0)
  }

  replaceSmoothCurve () {
    const {canvas, canvasCtx, hiddenCanvasCtx: ctx} = this
    const {paintCurveCoords} = this.props
    const skip = SKIP_FOR_SMOOTH * 2
    const points = paintCurveCoords.filter((a, i, array) => i % skip === 0 || i % skip === 1 || i === array.length - 1 || i === array.length - 2)
    lineStyle(ctx)
    ctx.beginPath()
    ctx.moveTo(paintCurveCoords[0], paintCurveCoords[1])
    ctx.curve(points, 0.5)
    ctx.stroke()
    ctx.closePath()
    const {width, height} = canvas
    const img = ctx.getImageData(0, 0, width, height)
    canvasCtx.putImageData(img, 0, 0)
  }
}

export default PaintCanvas
