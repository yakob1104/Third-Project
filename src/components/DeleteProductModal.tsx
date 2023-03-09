import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import { deleteProduct } from "../services/productsService";
import { successMsg } from "../services/feedbacks";

interface DeleteProductModalProps {
  show: boolean;
  onHide: Function;
  productId: number;
  refresh: Function;
}

const DeleteProductModal: FunctionComponent<DeleteProductModalProps> = ({
  show,
  onHide,
  productId,
  refresh,
}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={() => onHide()}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            DELETE PRODUCT
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Are you sure?</div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-danger"
            onClick={() => {
              deleteProduct(productId)
                .then(() => {
                  onHide();
                  successMsg("Product deleted successfully");
                  refresh();
                })
                .catch((err) => console.log(err));
            }}
          >
            Yes
          </button>
          <button className="btn btn-primary" onClick={() => onHide()}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteProductModal;
