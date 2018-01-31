import './SlideEditPane.css'
import React from 'react'
import {pure} from 'recompose'
import AssetTypeTabs from '../tabs/AssetTypeTabs'
import AssetPhotoPane from './AssetPhotoPane'
import AssetVideoPane from './AssetVideoPane'
import AssetCard from '../cards/AssetCard'
import SlideEditToolBar from '../toolbars/SlideEditToolBar'
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

const SlideEdittingPane = ({
  asset,
}) => (
  <div className='SlideEdittingPane'>
    <AssetCard
      width={640}
      height={360}
      asset={asset}
      thumbnailOnly={false}
    />
  </div>
)

const SlideEditPane = ({
  slide = null,
  deleteEdittingSlide,
  assetTabKey,
  setAssetTabKey,
  assetPhotos,
  assetVideos,
  selectAssetAsSlide,
}) => (
  <div className='SlideEditPane'>
    {slide && slide.id}
    {
      isEmptySlide(slide) && 'select slide'
    }
    {
      !isEmptySlide(slide) && (isEmptyAsset(slide)
        ? <SelectAssetPane {...{
          assetTabKey,
          setAssetTabKey,
          assetPhotos,
          assetVideos,
          selectAssetAsSlide,
        }} />
        : <SlideEdittingPane asset={slide.asset} />)
    }
    {
      !isEmptySlide(slide) &&
      <SlideEditToolBar
        onRemoveSlide={deleteEdittingSlide}
        onRemoveAsset={() => selectAssetAsSlide(null)}
      />
    }
  </div>
)

export default pure(SlideEditPane)
