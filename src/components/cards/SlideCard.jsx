import './SlideCard.css'
import React from 'react'
import {pure} from 'recompose'
import {Card} from 'antd'
import AssetCard from './AssetCard'
import c from 'classnames'

const SlideCard = ({slide, setEdittingSlideId, highlight}) => (
  <div className='SlideCard'>
    {
      slide.asset
        ? <AssetCard
          className={c('SlideCard-card', { 'SlideCard-card-highlight': highlight })}
          onClick={() => setEdittingSlideId(slide.id)}
          thumbnailOnly
          asset={slide.asset}
          width={184}
          height={103}
        />
        : <Card
          className={c('SlideCard-card', { 'SlideCard-card-highlight': highlight }, 'SlideCard-nocontent')}
          onClick={() => setEdittingSlideId(slide.id)}
        ><p>no content</p></Card>
    }
  </div>
)

export default pure(SlideCard)
