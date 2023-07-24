import {
  Backdrop,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Modal,
  Typography,
  Zoom,
} from "@mui/material";
import React from "react";
import { Character } from "../../../data/model/interface";
import { useCharacterStatusColor } from "../../CharacterStyleHelper";

const style = {
  display: "flex",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "fit-content",
  height: "fit-content",
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "0px",
};

interface Props {
  handleClose: () => void;
  isOpen: boolean;
  character: Character;
}

export const CharacterPopup: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = React.useState(props.isOpen);

  const handleClose = () => {
    setIsOpen(false);
    props.handleClose();
  };
  const statusColor = useCharacterStatusColor(props.character.status);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      // closeAfterTransition
      // slots={{ backdrop: Backdrop }}
      // slotProps={{
      //   backdrop: {
      //     timeout: 500,
      //   },
      // }}
    >
      <Box sx={style}>
        <Zoom in={isOpen} style={{ transitionDelay: isOpen ? "10ms" : "0ms" }}>
          <Card
            raised
            sx={{
              maxWidth: 640,
              margin: "0 auto",
              padding: "0.1em",
            }}
          >
            <CardMedia
              component="img"
              height="800"
              sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
              image={props.character.image}
              title="image"
            />
            <CardContent>
              <Typography id="name" gutterBottom variant="h3" component="div">
                {props.character.name}
              </Typography>
              <Typography
                id="status"
                variant="h5"
                color={statusColor}
                style={{ fontWeight: "bold" }}
              >
                {props.character.status}
              </Typography>
              <Typography id="species" variant="body2" color="text.secondary">
                Species: {props.character.species}
              </Typography>
              <Typography id="origin" variant="body2" color="text.secondary">
                Origin: {props.character.origin?.name}
              </Typography>
              <Typography id="location" variant="body2" color="text.secondary">
                Location: {props.character.location?.name}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={handleClose}>
                Close
              </Button>
            </CardActions>
          </Card>
        </Zoom>
      </Box>
    </Modal>
  );
};
