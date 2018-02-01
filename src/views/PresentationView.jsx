import './PresentationView.css'
import React, {Component} from 'react'
import {asView} from '../wrappers'
import {AssetType, PresenSize} from '../Consts'
import {assetPathToUrl} from '../helpers'
import {Button} from 'antd'

const {
  NORMAL_WIDTH,
  NORMAL_HEIGHT,
} = PresenSize

class PresenPhoto extends Component {
  render () {
    const {
      slide
    } = this.props
    const src = assetPathToUrl(slide.asset.path)
    return (
      <img className='PresentationView-img' src={src} width={NORMAL_WIDTH} height={NORMAL_HEIGHT} ref={(i) => { this.img = i }} />
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
      toggleIsPresenStarted,
      isLastPresenSlide,
    } = this.props
    if (isLastPresenSlide) {
      toggleIsPresenStarted(false)
    } else {
      countupPresenIndex()
    }
  }
}

class PresenVideo extends Component {
  render () {
    const {
      slide
    } = this.props
    const src = assetPathToUrl(slide.asset.path)
    return (
      <video className='PresentationView-video' src={src} width={NORMAL_WIDTH} height={NORMAL_HEIGHT} autoPlay ref={v => { this.video = v }} />
    )
  }

  componentDidMount () {
    const {video} = this
    const {
      slide,
      toggleIsPresenPlaying,
    } = this.props
    document.addEventListener('keydown', this.onPressRightKey)
    toggleIsPresenPlaying(true)
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
      countupPresenIndex,
      isLastPresenSlide,
      toggleIsPresenStarted,
    } = this.props
    if (isLastPresenSlide) {
      toggleIsPresenStarted(false)
    } else {
      countupPresenIndex()
    }
  }
}

class Presentation extends Component {
  render () {
    const {
      slide,
      isLastPresenSlide,
      countupPresenIndex,
      toggleIsPresenPlaying,
      toggleIsPresenStarted,
    } = this.props
    return (
      <div className='PresentationView-main'>
        {
          slide.asset.assetType === AssetType.PHOTO
            ? <PresenPhoto
              {...{
                slide,
                countupPresenIndex,
                isLastPresenSlide,
                toggleIsPresenStarted,
              }}
              ref={p => { this.presenPhoto = p }}
            />
            : <PresenVideo
              {...{
                slide,
                countupPresenIndex,
                toggleIsPresenPlaying,
                isLastPresenSlide,
                toggleIsPresenStarted,
              }}
              ref={(p) => { this.presenVideo = p }}
            />
        }
        <canvas className='PresentationView-canvas' width={NORMAL_WIDTH} height={NORMAL_HEIGHT} ref={(c) => { this.canvas = c }} />
      </div>
    )
  }

  componentDidMount () {
    this.start()
  }

  componentWillUnmount () {
    this.cancelAnimation()
    this.props.resetPresen()
  }

  start = () => {
    this.props.resetPresen()
    this.cancelAnimation()
    const {canvas} = this
    const context = canvas.getContext('2d')
    const syncCanvas = () => {
      const {presenVideo, presenPhoto} = this
      if (presenVideo && presenVideo.video) {
        context.drawImage(presenVideo.video, 0, 0, NORMAL_WIDTH, NORMAL_HEIGHT)
        window.requestAnimationFrame(syncCanvas)
      } else if (presenPhoto && presenPhoto.img) {
        context.drawImage(presenPhoto.img, 0, 0, NORMAL_WIDTH, NORMAL_HEIGHT)
        window.requestAnimationFrame(syncCanvas)
      }
    }
    this.animationId = window.requestAnimationFrame(syncCanvas)
  }

  cancelAnimation () {
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId)
    }
  }
}

class PresentationView extends Component {
  render () {
    const {
      presentingSlide: slide,
      isSlideCompleted,
      isPresenStarted,
      isLastPresenSlide,
      toggleIsPresenPlaying,
      toggleIsPresenStarted,
      countupPresenIndex,
      resetPresen,
    } = this.props
    if (!isSlideCompleted) {
      return (
        <div className='PresentationView-not-prepared'>
          Not prepared.
        </div>
      )
    }
    if (!isPresenStarted) {
      return (
        <div className='PresentationView-finished'>
          <div>
            <Button onClick={toggleIsPresenStarted}>START</Button>
          </div>
        </div>
      )
    }
    return (
      <div className='PresentationView'>
        <Presentation
          {...{
            slide,
            isLastPresenSlide,
            countupPresenIndex,
            toggleIsPresenPlaying,
            resetPresen,
            toggleIsPresenStarted,
          }}
        />
      </div>
    )
  }
}

export default asView(PresentationView)
