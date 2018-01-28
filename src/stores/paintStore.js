import {updaterOf} from '../helpers'
import {asStore} from '../wrappers'

class PaintStore {
  static initial (props) {
    return {
      paintDrawing: false,
      paintPrevCoord: {x: 0, y: 0},
      paintClearing: false,
      paintRecording: false,
      paintCurveCoords: []
    }
  }
  static computed (props) {
    return {}
  }
  static updaters = {
    setPaintDrawing: updaterOf('paintDrawing'),
    setPaintPrevCoord: updaterOf('paintPrevCoord'),
    startPaintClearing: () => () => ({paintClearing: true}),
    finishPaintClearing: () => () => ({paintClearing: false}),
    startPaintRecording: () => () => ({paintRecording: true}),
    finishPaintRecording: () => () => ({paintRecording: false}),
    pushPaintCurveCoords: ({paintCurveCoords}) => ({x, y}) => ({paintCurveCoords: paintCurveCoords.concat(x, y)}),
    clearPaintCurveCoords: () => () => ({paintCurveCoords: []}),
  }
  static actions = {
  }
}

export default asStore(PaintStore)
