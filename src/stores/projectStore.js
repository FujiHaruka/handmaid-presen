import {Project} from '../models'
import {updaterOf} from '@self/helpers'
import {asStore} from '@self/wrappers'

class ProjectStore {
  static initial (props) {
    return {
      projectName: '',
    }
  }

  static computed (props) {
    return {}
  }

  static updaters = {
    setProjectNameRaw: updaterOf('projectName'),
  }

  static actions = {
    syncProject: ({setProjectNameRaw, setProjectDirRaw}) => async () => {
      if (!Project.isLoaded) {
        await Project.load()
      }
      setProjectNameRaw(Project.get('name'))
    },
    setProjectName: ({setProjectNameRaw}) => async (name) => {
      if (!Project.isLoaded) {
        await Project.load()
      }
      await Project.update({name})
      setProjectNameRaw(name)
    }
  }
}

export default asStore(ProjectStore)
