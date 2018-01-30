import './SlideEditPane.css'
import React from 'react'
import AssetTypeTabs from '../tabs/AssetTypeTabs'
import AssetPhotoPane from './AssetPhotoPane'
import AssetVideoPane from './AssetVideoPane'
import {AssetType} from '../../Consts'

const isEmptySlide = (slide) => !slide
const isEmptyAsset = (slide) => !slide.asset

const SelectAssetPane = ({
  assetTabKey,
  setAssetTabKey,
  assetPhotos,
  assetVideos,
  selectAssetAsSlide,
}) => (
  <div>
    <AssetTypeTabs
      activeKey={assetTabKey}
      onChange={setAssetTabKey}
    />
    <AssetPhotoPane if={assetTabKey === AssetType.PHOTO} assetPhotos={assetPhotos} onSelect={selectAssetAsSlide} thumbnailOnly />
    <AssetVideoPane if={assetTabKey === AssetType.VIDEO} assetVideos={assetVideos} onSelect={selectAssetAsSlide} thumbnailOnly />
  </div>
)

const SlideEditPane = ({
  slide = null,
  ...props
}) => (
  console.log(slide) ||
  <div className='SlideEditPane'>
    {
      isEmptySlide(slide) && 'select slide'
    }
    {
      !isEmptySlide(slide) && (isEmptyAsset(slide)
        ? <SelectAssetPane {...props} />
        : JSON.stringify(slide || {}))
    }
  </div>
)

export default SlideEditPane
