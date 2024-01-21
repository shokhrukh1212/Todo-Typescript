import Modal from "@mui/material/Modal";
import { CustomModalProps } from "../../types/common";

const CustomModal: React.FC<CustomModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  children,
}) => {
  // handling modal close
  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        {children}
      </Modal>
    </div>
  );
};

export default CustomModal;
