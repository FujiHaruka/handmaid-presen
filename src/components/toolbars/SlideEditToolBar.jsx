import './SlideEditToolBar.css'
import React from 'react'
import {pure} from 'recompose'
import {Button, Dropdown, Menu, Icon} from 'antd'
import {PlaybackSpeed, AssetType} from '../../Consts'

const SlideEditToolBar = ({
  assetType,
  onRemoveSlide,
  onRemoveAsset,
  playbackRate,
  setPlaybackSpeed,
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
    {
      assetType === AssetType.VIDEO &&
      <Dropdown
        placement='topLeft'
        overlay={
          <Menu onClick={({key}) => setPlaybackSpeed(key)} selectedKeys={[playbackRate]}>
            <Menu.Item key={PlaybackSpeed.PLAYBACK_FAST}>
              FAST
            </Menu.Item>
            <Menu.Item key={PlaybackSpeed.PLAYBACK_NORMAL}>
              NORMAL
            </Menu.Item>
          </Menu>
        }
      >
        <Button>
          SPEED <Icon type='up' />
        </Button>
      </Dropdown>
    }
  </div>
)

export default pure(SlideEditToolBar)
