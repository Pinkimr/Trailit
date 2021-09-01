import React from 'react'
import {Modal} from 'react-bootstrap'

const ConfirmationModal = props => {
  const {
    open = false,
    header = 'Delete',
    setOpen = () => {},
    onSuccess = () => {},
    onCancel = () => {},
    successText = 'yes',
    cancelText = 'no',
    content = 'Are you sure you want to delete ?',
  } = props
  return (
    <Modal
      show={open}
      onHide={() => {
        setOpen(false)
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="frbgclor"
    >
      <Modal.Header>
        <Modal.Title>{header}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content}</Modal.Body>
      <Modal.Footer>
        <button
          type="button"
          className="cncl_btn mr-2"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(false)
            onCancel()
          }}
        >
          {cancelText}
        </button>
        <button
          type="submit"
          className="sbmt_btn mx-75"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            onSuccess()
          }}
        >
          {successText}
        </button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal
