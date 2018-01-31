import './SlideListPane.css'
import React from 'react'
import {pure} from 'recompose'
import NewSlideCard from '../cards/NewSlideCard'
import SlideCard from '../cards/SlideCard'

const SlideListPane = ({
  slidesArray,
  edittingSlide,
  prepareNewSlide,
  setEdittingSlideId,
}) => (
  <div className='SlideListPane'>
    {
      slidesArray.map(
        (slide, index) => (
          <div key={slide.id} className='SlideListPane-card-wrap'>
            <SlideCard
              highlight={edittingSlide && slide.id === edittingSlide.id}
              {...{slide, setEdittingSlideId}}
            />
            <div className='SlideListPane-card-index'>
              {index + 1}
            </div>
          </div>
        )
      )
    }
    <NewSlideCard {...{prepareNewSlide}} />
  </div>
)

export default pure(SlideListPane)
