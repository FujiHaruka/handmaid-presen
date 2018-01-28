import './AssetVideoPane.css'
import React from 'react'
import {Button, Icon} from 'antd'
import AssetListCards from './AssetListCards'
import {onlyIf} from '../wrappers'

const AssetVideoPane = ({
  assetVideos,
  prepareRecording,
  prepareDeleteAsset,
}) => (
  <div className='AssetVideoPane'>
    <div className='AssetVideoPane-start'>
      <Button
        className='AssetVideoPane-start-button'
        size='large'
        type='primary'
        onClick={prepareRecording}
      >
        Recording
        <Icon type='caret-right' />
      </Button>
    </div>
    <div>
      <AssetListCards
        assetList={assetVideos}
        {...{prepareDeleteAsset}}
      />
    </div>
  </div>
)

export default onlyIf('if')(AssetVideoPane)
