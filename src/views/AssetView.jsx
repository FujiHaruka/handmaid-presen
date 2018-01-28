import './AssetView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {
  AssetTypeTabs,
  AssetPhotoPane,
} from '../components'
import {AssetType} from '../Consts'

class AssetView extends Component {
  render () {
    const {props} = this
    const {
      assetTabKey,
      setAssetTabKey,
    } = props
    return (
      <div className='AssetView'>
        <AssetTypeTabs
          activeKey={assetTabKey}
          onChange={setAssetTabKey}
        />
        <AssetPhotoPane if={assetTabKey === AssetType.PHOTO} {...props} />
      </div>
    )
  }
}

export default asView(AssetView)
