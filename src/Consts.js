import conf from './conf.json'

export const ViewPage = {
  SETTINGS_PAGE: 'SETTINGS_PAGE',
  EDIT_PAGE: 'EDIT_PAGE',
  ASSET_PAGE: 'ASSET_PAGE',
  PRESENTATION_PAGE: 'PRESENTATION_PAGE',
  RECORDING_PAGE: 'RECORDING_PAGE',
}

export const AssetType = {
  VIDEO: 'video',
  PHOTO: 'photo',
}

export const AssetPageTab = {
  VIDEO: 'video',
  PHOTO: 'photo',
}

export const ProjectDirs = {
  ASSETS: 'assets',
}

export const Ports = {
  ASSETS_SERVER_PORT: conf.ASSETS_SERVER_PORT,
}

export const VIDEO_PLAY_SPEED = {
  NORMAL: 1.0,
  FAST: 5.0,
}
