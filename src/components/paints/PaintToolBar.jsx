import {pure} from 'recompose'
import Button from 'antd'

const PaintToolbar = ({
  paintRecording,
  startPaintRecording,
  finishPaintRecording,
  startPaintClearing,
}) => (
  <div class='PaintToolbar'>
    <span class='PaintToolbar-button'>
      <Button
        primary
        onClick={paintRecording ? finishPaintRecording : startPaintRecording}
      >
        {paintRecording ? 'FINISH' : 'RECORD'}
      </Button>
    </span>
    <span class='PaintToolbar-button'>
      <Button stroked onClick={startPaintClearing}>
        CLEAR
      </Button>
    </span>
    <span class='PaintToolbar-message'>
      <span class='PaintToolbar-message-inner'>
        {paintRecording && 'Recording...'}
      </span>
    </span>
  </div>
)

export default pure(PaintToolbar)
