import './PresentationView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {AssetType} from '../Consts'
import {assetPathToUrl} from '../helpers'
import {Button} from 'antd'

class PresenPhoto extends Component {
  render () {
    const {
      slide
    } = this.props
    const src = assetPathToUrl(slide.asset.path)
    return (
      <img className='PresentationView-img' src={src} width={640} height={360} />
    )
  }

  componentDidMount () {
    document.addEventListener('keydown', this.onPressRightKey)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onPressRightKey)
  }

  onPressRightKey = (e) => {
    if (e.key !== 'ArrowRight') {
      return
    }
    const {
      countupPresenIndex,
    } = this.props
    countupPresenIndex()
  }
}

class PresenVideo extends Component {
  render () {
    const {
      slide
    } = this.props
    const src = assetPathToUrl(slide.asset.path)
    return (
      <video className='PresentationView-video' src={src} width={640} height={360} ref={v => { this.video = v }} />
    )
  }

  componentDidMount () {
    const {video} = this
    const {
      slide,
      toggleIsPresenPlaying,
    } = this.props
    document.addEventListener('keydown', this.onPressRightKey)
    video.addEventListener('ended', () => {
      toggleIsPresenPlaying(false)
    })
    const {playbackRate} = slide
    if (playbackRate) {
      video.playbackRate = playbackRate
    }
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.onPressRightKey)
  }

  componentDidUpdate () {
    const {slide} = this.props
    const {playbackRate = 1.0} = slide
    if (playbackRate) {
      this.video.playbackRate = playbackRate
    }
  }

  onPressRightKey = (e) => {
    if (e.key !== 'ArrowRight') {
      return
    }
    const {
      isPresenStartedPlaying,
      countupPresenIndex,
      toggleIsPresenPlaying,
      toggleIsPresenStartedPlaying,
    } = this.props
    if (isPresenStartedPlaying) {
      countupPresenIndex()
      toggleIsPresenPlaying(false)
      toggleIsPresenStartedPlaying(false)
    } else {
      this.video.play()
      toggleIsPresenStartedPlaying(true)
      toggleIsPresenPlaying(true)
    }
  }
}

class PresentationView extends Component {
  render () {
    const {
      presentingSlide: slide,
      isSlideCompleted,
      isPresenFinished,
      isPresenStartedPlaying,
      toggleIsPresenPlaying,
      countupPresenIndex,
      toggleIsPresenStartedPlaying,
      resetPresen,
    } = this.props
    if (!isSlideCompleted) {
      return (
        <div className='PresentationView-not-prepared'>
          Not prepared.
        </div>
      )
    }
    if (isPresenFinished) {
      return (
        <div className='PresentationView-finished'>
          finished
          <div>
            <Button onClick={resetPresen}>AGAIN</Button>
          </div>
        </div>
      )
    }
    return (
      <div className='PresentationView'>
        <div className='PresentationView-main'>
          {
            slide.asset.assetType === AssetType.PHOTO
              ? <PresenPhoto
                {...{
                  slide,
                  countupPresenIndex,
                }}
              />
              : <PresenVideo
                {...{
                  slide,
                  isPresenStartedPlaying,
                  countupPresenIndex,
                  toggleIsPresenPlaying,
                  toggleIsPresenStartedPlaying,
                }}
            />
          }
        </div>
      </div>
    )
  }

  componentDidMount () {}
  componentWillUnmount () {
    this.props.resetPresen()
  }
}

export default asView(PresentationView)
