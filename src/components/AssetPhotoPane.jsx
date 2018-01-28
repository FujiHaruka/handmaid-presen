import './AssetPhotoPane.css'
import React from 'react'
import PhotoDragger from './PhotoDragger'
import AssetListCards from './AssetListCards'
import {onlyIf} from '../wrappers'

const AssetPhotoPane = ({
  addNewPhotoAsAsset,
  assetPhotos,
  prepareDeleteAsset,
}) => (
  <div className='AssetPhotoPane'>
    <div>
      <PhotoDragger
        onAddFile={addNewPhotoAsAsset}
      />
    </div>
    <div>
      <AssetListCards
        assetList={assetPhotos}
        {...{prepareDeleteAsset}}
      />
    </div>
  </div>
)

export default onlyIf('if')(AssetPhotoPane)
