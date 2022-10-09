import {
  Modal, Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { EntityTableView } from "../EntityTableView";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  minHeight: "50%",
  maxHeight: "90%",
  bgcolor: "background.main",
  borderRadius: 1,
  p: 4,
  overflow: "auto",
};

export const ViewEntityRecordsModal = ({ open, entity = {}, handleClose }) => {
  const closeModal = () => {
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={style}
      >
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          fontWeight={500}
          paddingBottom="16px"
        >
          Visualizar registros da entidade
        </Typography>

        <EntityTableView entity={entity} />
      </Box>
    </Modal>
  );
};
