import './AssetView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {
  AssetTypeTabs,
  PhotoDragger,
  AssetPhotoCards,
} from '../components'

class AssetView extends Component {
  render () {
    const {
      assetPhotos,
      assetVideos,
      assetTabKey,
      setAssetTabKey,
      addNewPhotoAsAsset,
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
            {...{assetPhotos}}
          />
        </div>
      </div>
    )
  }
}

export default asView(AssetView)
