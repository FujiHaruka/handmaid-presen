import React, {Component} from 'react'
import {asView} from '../wrappers'
import {Input} from 'antd'
import linkstate from 'linkstate'
import './SettingView.css'

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
        <div className='SettingView-title-wrap'>
          <span className='SettingView-title'>Settings</span>
        </div>
        <div className='SettingView-form'>
          <div className='SettingView-form-container'>
            <div className='SettingView-form-label'>Project Name: {projectName}</div>
            <Input
              className='SettingView-form-input'
              placeholder='New Project Name'
              value={nameInputStr}
              onChange={linkstate(this, 'nameInputStr')}
              onKeyPress={this.onPressEnterNameInput}
              ref={(input) => { this.nameInput = input }}
            />
          </div>
        </div>
      </div>
    )
  }

  onPressEnterNameInput = (e) => {
    if (e.key === 'Enter') {
      console.log('change project name')
      const {nameInputStr} = this.state
      if (nameInputStr.length === 0) {
        return
      }
      this.props.setProjectName(nameInputStr)
      this.nameInput.blur()
    }
  }
}

export default asView(SettingView)
