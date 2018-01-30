import './SlideCard.css'
import React from 'react'
import {pure} from 'recompose'
import {Card, Icon} from 'antd'
import c from 'classnames'

const SlideCard = ({slide, setEdittingSlide, highlight}) => (
  <div className='SlideCard'>
    <Card
      className={c('SlideCard-card', { 'SlideCard-card-highlight': highlight })}
      onClick={() => setEdittingSlide(slide)}
    >
      {slide.id}
    </Card>
  </div>
)

export default pure(SlideCard)
