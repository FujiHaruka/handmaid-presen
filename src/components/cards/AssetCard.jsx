import './AssetCard.css'
import React from 'react'
import {pure, withState, compose, lifecycle} from 'recompose'
import {Card, Icon} from 'antd'
import {Ports, AssetType} from '../../Consts'
import c from 'classnames'

const CARD_WIDTH = 320
const CARD_HEIGHT = 180
const sizeStyle = ({width, height}) => ({
  width: `${width}px`,
  height: `${height}px`,
})

const VideoCardContent = compose(
  pure,
  withState('visibleThumbnail', 'toggleVisibleThumbnail', true),
  lifecycle({
    componentDidUpdate (prevProps) {
      const {props} = this
      if (props.src !== prevProps.src) {
        props.toggleVisibleThumbnail(true)
      }
    }
  })
)(
  ({
    width,
    height,
    src,
    thumbnail,
    visibleThumbnail,
    toggleVisibleThumbnail,
    thumbnailOnly,
  }) => (
    <div className='AssetCard-video-wrap'>
      {
        visibleThumbnail &&
        <div className='AssetCard-video-thumbnail' style={sizeStyle({width, height})}>
          {
            !thumbnailOnly &&
            <Icon type='play-circle-o' className='AssetCard-video-thumbnail-icon' />
          }
          <img
            className='AssetCard-video-thumbnail-img'
            src={thumbnail}
            onClick={!thumbnailOnly ? () => toggleVisibleThumbnail(false) : undefined}
            {...{width, height}}
            alt='asset video thumbnail'
          />
        </div>
      }
      {
        !thumbnailOnly &&
        <video className='AssetCard-video' preload='metadata' controls {...{width, height, src}} />
      }
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
    thumbnailOnly = false,
    onClick = () => {},
    className
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
        onClick={onClick}
        className={c('AssetCard', className)}
        cover={
          <div className='AssetCard-cover'>
            {
              assetType === AssetType.PHOTO
                ? <img className='AssetCard-img' {...mediaProps} alt='asset card' />
                : <VideoCardContent {...mediaProps} thumbnailOnly={thumbnailOnly} />
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
