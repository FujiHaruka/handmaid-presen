import './AssetPhotoPane.css'
import React from 'react'
import PhotoDragger from './PhotoDragger'
import AssetListCards from './AssetListCards'
import AssetDeletingModal from './AssetDeletingModal'
import {onlyIf} from '../wrappers'

const AssetPhotoPane = ({
  addNewPhotoAsAsset,
  assetPhotos,
  visibleAssetDeletingModal,
  prepareDeleteAsset,
  deletingAsset,
  commitDeletingAsset,
  setVisibleAssetDeletingModal,
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

    <AssetDeletingModal
      asset={deletingAsset}
      visible={visibleAssetDeletingModal}
      onDelete={commitDeletingAsset}
      onCancel={() => setVisibleAssetDeletingModal(false)}
    />
  </div>
)

export default onlyIf('if')(AssetPhotoPane)
