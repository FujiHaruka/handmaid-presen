import './AssetVideoPane.css'
import React from 'react'
import {Button, Icon} from 'antd'
import AssetListCards from '../cards/AssetListCards'
import {onlyIf} from '../../wrappers'
import {isEmpty} from 'ramda'

const AssetVideoPane = ({
  withRecordingButton = false,
  assetVideos,
  prepareRecording,
  prepareDeleteAsset,
  onSelect,
  thumbnailOnly,
}) => (
  <div className='AssetVideoPane'>
    <div className='AssetVideoPane-start'>
      {
        withRecordingButton &&
        <Button
          className='AssetVideoPane-start-button'
          size='large'
          type='primary'
          onClick={prepareRecording}
        >
          Recording
          <Icon type='caret-right' />
        </Button>
      }
    </div>
    <div>
      <AssetListCards
        assetList={assetVideos}
        {...{prepareDeleteAsset, onSelect, thumbnailOnly}}
      />
      {
        isEmpty(assetVideos) &&
        <p className='AssetPhotoPane-empty'>no items</p>
      }
    </div>
  </div>
)

export default onlyIf('if')(AssetVideoPane)
