import './SlideEditPane.css'
import React from 'react'
import {pure} from 'recompose'

const SlideEditPane = ({
  slide = null
}) => (
  <div className='SlideEditPane'>
    {JSON.stringify(slide || {})}
  </div>
)

export default pure(SlideEditPane)
