import React from 'react'
import {pure} from 'recompose'
import {Modal} from 'antd'

const AssetDeletingModal = ({
  asset,
  visible,
  onDelete,
  onCancel,
}) => (
  <Modal
    title='Delete Asset'
    visible={visible}
    onOk={onDelete}
    onCancel={onCancel}
  >
    Are you sure to delete the asset?
  </Modal>
)

export default pure(AssetDeletingModal)
