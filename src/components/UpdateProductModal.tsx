import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import UpdateProduct from "./UpdateProduct";

interface UpdateProductModalProps {
  show: boolean;
  onHide: Function;
  productId: number;
  refresh: Function;
}

const UpdateProductModal: FunctionComponent<UpdateProductModalProps> = ({
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
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            UPDATE CARDS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UpdateProduct
            onHide={() => onHide()}
            productId={productId}
            refresh={refresh}
          />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
