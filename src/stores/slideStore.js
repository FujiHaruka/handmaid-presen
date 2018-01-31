import {updaterOf, syncFromDb} from '../helpers'
import {asStore} from '../wrappers'
import {Slide} from '../models'
import {map} from 'ramda'
import {ok} from '../helpers/nodejs'

class SlideStore {
  static initial (props) {
    return {
      slidesRaw: {},
      edittingSlideId: null,
    }
  }

  static computed (props) {
    const {slidesRaw, assets, edittingSlideId} = props
    const slides = map((slide) => ({
      ...slide,
      asset: assets[slide.assetId] || null
    }))(slidesRaw)
    const slidesArray = Object.keys(slides)
      .map((id) => slides[id])
      .sort((a, b) => a.index - b.index)
    const isSlideCompleted = slidesArray.every((slide) => Boolean(slide.asset))
    const edittingSlide = slides[edittingSlideId] || null
    return {
      slides,
      slidesArray,
      edittingSlide,
      isSlideCompleted,
    }
  }

  static updaters = {
    setSlidesRaw: updaterOf('slidesRaw'),
    setEdittingSlideId: updaterOf('edittingSlideId'),
  }

  static actions = {
    syncSlide: ({setSlidesRaw}) => async () => {
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
    },
    appendSlide: ({slides, setSlidesRaw, slidesArray}) => async (slide) => {
      const index = slidesArray.length
      const creating = {
        index,
        ...slide
      }
      const created = await Slide.create(creating)
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
      return created
    },
    updateSlide: ({setSlidesRaw}) => async (id, slide) => {
      ok(id)
      ok(slide)
      await Slide.update({
        [id]: slide
      })
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
    },
    insertSlide: ({setSlidesRaw, slidesArray}) => async (slide, index) => {
      if (index > slidesArray.length) {
        throw new Error(`Index ${index} is out of range`)
      }
      slide.index = index
      const created = await Slide.create(slide)
      const slides = slidesArray
        .map((slide) => ({
          index: slide.index < index ? slide.index : slide.index + 1,
          ...slide
        }))
        .map((slide) => ({[slide.id]: slide}))
        .reduce((slides, slideObj) => Object.assign(slides, slideObj), {
          [slide.id]: created
        })
      await Slide.update(slides)
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
    },
    deleteSlide: ({setSlidesRaw, slides, slidesArray}) => async (id) => {
      const slide = slides[id]
      ok(slide)
      const filteredSlides = slidesArray
        .filter((slide) => slide.id !== id)
        .map((slide, index) => ({
          ...slide,
          ...{index},
        }))
        .map((slide) => ({[slide.id]: slide}))
        .reduce((slides, slideObj) => Object.assign(slides, slideObj), {})
      await Slide.update(filteredSlides)
      await Slide.delete(id)
      await syncFromDb({
        set: setSlidesRaw,
        db: Slide
      })
    }
  }
}

export default asStore(SlideStore)
