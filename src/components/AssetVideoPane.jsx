import './AssetVideoPane.css'
import React from 'react'
import AssetListCards from './AssetListCards'
import {onlyIf} from '../wrappers'

const AssetVideoPane = ({
  assetVideos,
  prepareDeleteAsset,
}) => (
  <div className='AssetVideoPane'>
    <div>
      go!
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
