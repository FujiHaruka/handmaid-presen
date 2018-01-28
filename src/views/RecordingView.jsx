import './RecordingView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {Button} from 'antd'

class RecordingView extends Component {
  render () {
    const {props} = this
    const {quitRecordingView} = props
    return (
      <div className='RecordingView'>
        <div className='RecordingView-quit'>
          <Button shape='circle' icon='left' onClick={quitRecordingView} />
        </div>
      </div>
    )
  }
}

export default asView(RecordingView)
