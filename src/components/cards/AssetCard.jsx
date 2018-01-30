import './AssetCard.css'
import React from 'react'
import {pure, withState} from 'recompose'
import {Card, Icon} from 'antd'
import {Ports, AssetType} from '../../Consts'

const CARD_WIDTH = 320
const CARD_HEIGHT = 180
const sizeStyle = ({width, height}) => ({
  width: `${width}px`,
  height: `${height}px`,
})

const VideoCardContent = withState('visibleThumbnail', 'toggleVisibleThumbnail', true)(
  ({
    width,
    height,
    src,
    thumbnail,
    visibleThumbnail,
    toggleVisibleThumbnail,
  }) => (
    <div className='AssetCard-video-wrap'>
      {
        visibleThumbnail &&
        <div className='AssetCard-video-thumbnail' style={sizeStyle({width, height})}>
          <Icon type='play-circle-o' className='AssetCard-video-thumbnail-icon' />
          <img
            className='AssetCard-video-thumbnail-img'
            src={thumbnail}
            onClick={() => toggleVisibleThumbnail(false)} {...{width, height}}
          />
        </div>
      }
      <video className='AssetCard-video' preload='metadata' controls {...{width, height, src}} />
    </div>
  )
)

const toUrl = (path) => `http://localhost:${Ports.ASSETS_SERVER_PORT}/${path}`
const AssetCard = pure(
  ({
    width = CARD_WIDTH,
    height = CARD_HEIGHT,
    asset,
    prepareDeleteAsset, // nullable
  }) => {
    const {path, assetType, thumbnailPath} = asset
    const url = toUrl(path)
    const thumbnailUrl = toUrl(thumbnailPath)
    const mediaProps = {
      width,
      height,
      src: url,
      thumbnail: thumbnailUrl,
    }
    return (
      <Card
        className='AssetCard'
        cover={
          <div className='AssetCard-cover'>
            {
              assetType === AssetType.PHOTO
                ? <img className='AssetCard-img' {...mediaProps} alt='asset card' />
                : <VideoCardContent {...mediaProps} />
            }
            {
              prepareDeleteAsset &&
              <Icon className='AssetCard-delete' type='close' onClick={() => prepareDeleteAsset(asset)} />
            }
          </div>
        }
        style={sizeStyle({width, height})}
      />
    )
  }
)

export default pure(AssetCard)
