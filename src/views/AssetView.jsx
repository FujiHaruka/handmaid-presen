import './AssetView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {
  AssetTypeTabs,
  AssetPhotoPane,
  AssetVideoPane,
  AssetDeletingModal,
} from '../components'
import {AssetType} from '../Consts'

class AssetView extends Component {
  render () {
    const {props} = this
    const {
      assetTabKey,
      setAssetTabKey,
      deletingAsset,
      visibleAssetDeletingModal,
      commitDeletingAsset,
      setVisibleAssetDeletingModal,
    } = props
    return (
      <div className='AssetView'>
        <AssetTypeTabs
          activeKey={assetTabKey}
          onChange={setAssetTabKey}
        />
        <AssetPhotoPane if={assetTabKey === AssetType.PHOTO} {...props} />
        <AssetVideoPane if={assetTabKey === AssetType.VIDEO} {...props} />

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
