import './AssetPhotoCards.css'
import React from 'react'
import {pure} from 'recompose'
import {Card, Icon} from 'antd'

const {nativeImage} = window.require('electron')
const {join} = window.require('path')

const PHOTO_CARD_WIDTH = 320
const PHOTO_CARD_HEIGHT = 180

const AssetPhotoCard = pure(
  ({
    photo,
    prepareDeleteAsset,
  }) => {
    const {path} = photo
    // TODO もっといい方法はない？
    const image = nativeImage.createFromPath(join(window.globals.projectDir, path))
    const dataUrl = image.resize({
      width: PHOTO_CARD_WIDTH,
      height: PHOTO_CARD_HEIGHT,
      quelity: 'good'
    }).toDataURL()
    return (
      <Card
        className='AssetPhotoCard'
        cover={
          <div className='AssetPhotoCard-cover'>
            <img className='AssetPhotoCard-img' width={PHOTO_CARD_WIDTH} height={PHOTO_CARD_HEIGHT} src={dataUrl} />
            <Icon className='AssetPhotoCard-delete' type='close' onClick={() => prepareDeleteAsset(photo)} />
          </div>
        }
      />
    )
  }
)

const AssetPhotoCards = ({
  assetPhotos = [],
  prepareDeleteAsset = () => {},
}) => (
  <div className='AssetPhotoCards'>
    {
      assetPhotos.map((photo) =>
        <AssetPhotoCard
          key={photo.id}
          photo={photo}
          prepareDeleteAsset={prepareDeleteAsset}
        />
      )
    }
  </div>
)

export default pure(AssetPhotoCards)
