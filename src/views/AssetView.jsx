import './AssetView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {
  AssetTypeTabs,
  PhotoDragger,
  AssetPhotoCards,
  AssetDeletingModal,
} from '../components'

class AssetView extends Component {
  render () {
    const {
      assetPhotos,
      assetVideos,
      assetTabKey,
      setAssetTabKey,
      deletingAsset,
      visibleAssetDeletingModal,
      setVisibleAssetDeletingModal,
      addNewPhotoAsAsset,
      prepareDeleteAsset,
      commitDeletingAsset,
    } = this.props
    return (
      <div className='AssetView'>
        <AssetTypeTabs
          activeKey={assetTabKey}
          onChange={setAssetTabKey}
        />
        <div>
          {assetTabKey}
          <PhotoDragger
            onAddFile={addNewPhotoAsAsset}
          />
        </div>
        <div>
          <AssetPhotoCards
            {...{assetPhotos, prepareDeleteAsset}}
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
  }
}

export default asView(AssetView)
