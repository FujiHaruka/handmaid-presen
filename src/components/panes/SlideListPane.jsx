import './SlideListPane.css'
import React from 'react'
import {pure} from 'recompose'
import NewSlideCard from '../cards/NewSlideCard'
import SlideCard from '../cards/SlideCard'

const SlideListPane = ({
  slidesArray,
  prepareNewSlide,
  setEdittingSlide,
}) => (
  <div className='SlideListPane'>
    {
      slidesArray.map(
        (slide) => <SlideCard key={slide.id} {...{slide, setEdittingSlide}} />
      )
    }
    <NewSlideCard {...{prepareNewSlide}} />
  </div>
)

export default pure(SlideListPane)
