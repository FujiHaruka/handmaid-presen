import React, {Component} from 'react'
import {asView} from '../wrappers'
import {Input} from 'antd'
import linkstate from 'linkstate'

class SettingView extends Component {
  state = {
    nameInputStr: ''
  }

  render () {
    const {
      projectName,
    } = this.props
    const {
      nameInputStr,
    } = this.state
    return (
      <div className='SettingView'>
        <div className='SettingView-name'>
          {
            projectName &&
            <span>Project Name: {projectName}</span>
          }
          <Input
            placeholder='New Project Name'
            value={nameInputStr}
            onChange={linkstate(this, 'nameInputStr')}
            onKeyPress={this.onPressEnterNameInput}
          />
        </div>
      </div>
    )
  }

  onPressEnterNameInput = (e) => {
    if (e.keyCode === 13) { // Enter key
      const {nameInputStr} = this.state
      if (nameInputStr.length === 0) {
        return
      }
      this.props.setProjectName(nameInputStr)
    }
  }
}

export default asView(SettingView)
