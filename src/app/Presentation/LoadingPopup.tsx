import { Backdrop, Box, CircularProgress, Modal } from "@mui/material";
import React from "react";

const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "64px",
    height: "64px",
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    padding: "2px",
};


interface Props {
//   handleClose: () => void;
  isOpen: boolean;
}

export const LoadingPopup: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  const handleClose = () => {
    setIsOpen(false);
    // props.handleClose();
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
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.isOpen}
            // onClick={() => setLoadingStatus(false)}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
