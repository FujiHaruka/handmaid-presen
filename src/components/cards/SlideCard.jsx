import './SlideCard.css'
import React from 'react'
import {pure} from 'recompose'
import {Card, Icon} from 'antd'

const SlideCard = ({slide, setEdittingSlide}) => (
  <div className='SlideCard'>
    <Card
      className='SlideCard-card'
      onClick={() => setEdittingSlide(slide)}
    >
      {slide.id}
    </Card>
  </div>
)

export default pure(SlideCard)
