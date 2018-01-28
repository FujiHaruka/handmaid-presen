import './PhotoDragger.css'
import React from 'react'
import {Upload, Icon} from 'antd'
import {pure} from 'recompose'

const {Dragger} = Upload

const asDraggerCallback = (func) => async (file) => {
  const {path} = file
  func(path)
  return false
}

const PhotoDragger = ({
  onAddFile,
}) => (
  <div className='PhotoDragger'>
    <Dragger
      name='uploading-file'
      multiple={false}
      // ここに保存処理を入れる
      beforeUpload={asDraggerCallback(onAddFile)}
      accept='image/*'
      showUploadList={false}
      // not use
      action='/'
      customRequest={() => {}}
    >
      <p className='ant-upload-drag-icon'>
        <Icon type='inbox' />
      </p>
      <p className='ant-upload-text'>
        Click or drag file to this area to save a photo
      </p>
    </Dragger>
  </div>
)

export default pure(PhotoDragger)
