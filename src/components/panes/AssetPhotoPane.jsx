import './AssetPhotoPane.css'
import React from 'react'
import PhotoDragger from '../forms/PhotoDragger'
import AssetListCards from '../cards/AssetListCards'
import {onlyIf} from '../../wrappers'
import {isEmpty} from 'ramda'

const AssetPhotoPane = ({
  withDragger = false,
  addNewPhotoAsAsset,
  assetPhotos,
  prepareDeleteAsset,
  onSelect,
  thumbnailOnly,
}) => (
  <div className='AssetPhotoPane'>
    {
      withDragger &&
      <div>
        <PhotoDragger
          onAddFile={addNewPhotoAsAsset}
        />
      </div>
    }
    <div>
      <AssetListCards
        assetList={assetPhotos}
        {...{prepareDeleteAsset, onSelect, thumbnailOnly}}
      />
      {
        isEmpty(assetPhotos) &&
        <p className='AssetPhotoPane-empty'>no items</p>
      }
    </div>
  </div>
)

export default onlyIf('if')(AssetPhotoPane)
