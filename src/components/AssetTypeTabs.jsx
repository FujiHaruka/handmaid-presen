import './AssetTypeTabs.css'
import React from 'react'
import {Radio, Icon} from 'antd'
import {pure} from 'recompose'
import {AssetType} from '../Consts'
import {eventLink} from '../wrappers'

const AssetTypeTabs = ({
  onChange,
  activeKey,
}) => (
  <div className='AssetTypeTabs'>
    <Radio.Group
      value={activeKey}
      onChange={eventLink(onChange)}
    >
      <Radio.Button
        value={AssetType.PHOTO}
      >
        <Icon type='picture' className='AssetTypeTabs-icon' />Photo
      </Radio.Button>
      <Radio.Button
        value={AssetType.VIDEO}
      >
        <Icon type='play-circle-o' className='AssetTypeTabs-icon' />Video
      </Radio.Button>
    </Radio.Group>
  </div>
)

export default pure(AssetTypeTabs)
