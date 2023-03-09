import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import AddProduct from "./AddProduct";

interface AddProductModalProps {
  show: boolean;
  onHide: Function;
  refresh: Function;
}

const AddProductModal: FunctionComponent<AddProductModalProps> = ({
  show,
  onHide,
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
            ADD CARDS
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddProduct onHide={() => onHide()} refresh={refresh} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductModal;
