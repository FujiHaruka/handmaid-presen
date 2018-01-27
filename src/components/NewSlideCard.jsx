import './NewSlideCard.css'
import React from 'react'
import {pure} from 'recompose'
import {Card, Icon} from 'antd'

const NewSlideCard = ({prepareNewSlide}) => (
  <div className='NewSlideCard'>
    <Card
      bordered={false}
      className='NewSlideCard-card'
      onClick={prepareNewSlide}
    >
      <Icon type='plus' />
    </Card>
  </div>
)

export default pure(NewSlideCard)
