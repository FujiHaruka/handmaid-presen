import './AssetView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {
  AssetTypeTabs,
  PhotoDragger,
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
          {
            assetPhotos.map((a) =>
              <div key={a.id}>{JSON.stringify(a)}</div>
            )
          }
        </div>
      </div>
    )
  }
}

export default asView(AssetView)
