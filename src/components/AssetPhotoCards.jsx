import './AssetPhotoCards.css'
import React from 'react'
import {pure} from 'recompose'
import {Card, Icon} from 'antd'
import {Ports} from '../Consts'

const PHOTO_CARD_WIDTH = 320
const PHOTO_CARD_HEIGHT = 180

const AssetPhotoCard = pure(
  ({
    photo,
    prepareDeleteAsset,
  }) => {
    const {path} = photo
    const url = `http://localhost:${Ports.ASSETS_SERVER_PORT}/${path}`
    return (
      <Card
        className='AssetPhotoCard'
        cover={
          <div className='AssetPhotoCard-cover'>
            <img className='AssetPhotoCard-img' width={PHOTO_CARD_WIDTH} height={PHOTO_CARD_HEIGHT} src={url} />
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
