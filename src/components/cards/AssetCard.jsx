import './AssetCard.css'
import React from 'react'
import {pure, withState, compose} from 'recompose'
import {Card, Icon} from 'antd'
import {AssetType} from '../../Consts'
import c from 'classnames'
import {assetPathToUrl} from '../../helpers'

const CARD_WIDTH = 320
const CARD_HEIGHT = 180
const sizeStyle = ({width, height}) => ({
  width: `${width}px`,
  height: `${height}px`,
})

const VideoCardContent = compose(
  pure,
  withState('visibleThumbnail', 'toggleVisibleThumbnail', true),
)(class VideoCardContent extends React.Component {
  render () {
    const {
      width,
      height,
      src,
      thumbnail,
      visibleThumbnail,
      toggleVisibleThumbnail,
      thumbnailOnly,
    } = this.props
    return (
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
          <video className='AssetCard-video' preload='metadata' controls {...{width, height, src}} ref={v => { this.video = v }} />
        }
      </div>
    )
  }

  componentDidUpdate (prevProps) {
    const {props} = this
    if (props.src !== prevProps.src) {
      props.toggleVisibleThumbnail(true)
    }
    if (props.playbackRate !== prevProps.playbackRate) {
      const {playbackRate = 1.0} = props
      this.video.playbackRate = playbackRate
    }
  }
  componentDidMount () {
    if (this.video) {
      const {playbackRate = 1.0} = this.props
      this.video.playbackRate = playbackRate
    }
  }
})

const AssetCard = pure(
  ({
    width = CARD_WIDTH,
    height = CARD_HEIGHT,
    asset,
    prepareDeleteAsset, // nullable
    thumbnailOnly = false,
    onClick = () => {},
    className,
    playbackRate,
  }) => {
    const {path, assetType, thumbnailPath} = asset
    const url = assetPathToUrl(path)
    const thumbnailUrl = assetPathToUrl(thumbnailPath)
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
                : <VideoCardContent {...mediaProps} thumbnailOnly={thumbnailOnly} playbackRate={playbackRate} />
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
