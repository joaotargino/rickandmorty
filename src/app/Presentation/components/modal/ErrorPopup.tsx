import { Box, Button, Modal, Typography } from "@mui/material";
import React from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "primary.light",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  title: string;
  message: string;
}

export const ErrorPopup: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  const handleClose = () => {
    setIsOpen(false);
    props.handleClose();
  };
  return (
    <React.Fragment>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.message}
          </Typography>
          <Button variant="contained" onClick={handleClose}>
            OK
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
