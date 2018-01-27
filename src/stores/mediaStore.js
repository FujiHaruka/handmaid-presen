import {updaterOf, syncFromDb} from '../helpers'
import {asStore} from '../wrappers'
import {Media} from '../models'

class MediaStore {
  static initial (props) {
    return {
      medias: {}
    }
  }

  static computed (props) {
    return {}
  }

  static updaters = {
    setMedia: updaterOf('medias')
  }

  static actions = {
    syncMedia: ({setMedia}) => async () => {
      await syncFromDb({
        set: setMedia,
        db: Media
      })
    },
    addMedia: ({medias, setMedia}) => async (media) => {
      await Media.create(media)
      await syncFromDb({
        set: setMedia,
        db: Media
      })
    },
    removeMedia: ({medias, setMedia}) => async (id) => {
      const media = medias[id]
      if (!media) {
        throw new Error(`No such media as id = "${id}"`)
      }
      await Media.delete(id)
      await syncFromDb({
        set: setMedia,
        db: Media
      })
    }
  }
}

export default asStore(MediaStore)
