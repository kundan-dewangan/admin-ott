import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteModal({ deleteModal, setDeleteModal, deleteConfirmHanlder, isDeleteLoading }) {
  const handleClose = () => setDeleteModal(false);
  return (
    <>
      <Modal className="my-modal p-4" show={deleteModal} onHide={handleClose} backdrop="static"
        keyboard={false}>
        <Modal.Body className='text-center mt-2'>Are you sure you want to delete this item!</Modal.Body>
        <div className='d-flex justify-content-center mb-4 mt-2'>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" className='mx-2' onClick={deleteConfirmHanlder}>
          {isDeleteLoading && <Spinner animation="grow" size='sm' className='mx-2' />}
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
export default DeleteModal;