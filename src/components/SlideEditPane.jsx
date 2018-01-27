import React from 'react'
import {pure} from 'recompose'
import NewSlideCard from './NewSlideCard'
import {Card} from 'antd'

const SlideEditPane = ({
  slidesArray,
  prepareNewSlide,
}) => (
  <div>
    {
      slidesArray.map(
        (slide) => <Card>{slide.id}</Card>
      )
    }
    <NewSlideCard {...{prepareNewSlide}} />
  </div>
)

export default pure(SlideEditPane)
