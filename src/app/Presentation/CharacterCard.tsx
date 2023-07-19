import {
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import { Character } from "../data/model/interface";
import { CharacterPopup } from "./CharacterPopup";
import { useCharacterStatusColor } from "./CharacterStyleHelper";

export const CharacterCard: React.FC<{ character: Character }> = (props) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const statusColor = useCharacterStatusColor(props.character.status);

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };
  return (
    <>
      {isOpen ? (
        <CharacterPopup
          handleClose={handleClickClose}
          isOpen={isOpen}
          character={props.character}
        />
      ) : null}
      <ButtonBase
        onClick={handleClickOpen}
        sx={{
          display: "block",
          textAlign: "initial",
        }}
      >
        <Card
          raised
          sx={{
            maxWidth: 280,
            margin: "0 auto",
            padding: "0.1em",
          }}
        >
          <CardMedia
            component="img"
            height="250"
            sx={{ padding: "1em 1em 0 1em", objectFit: "contain" }}
            image={props.character.image}
            title="image"
          />

          <CardContent>
            <Typography noWrap gutterBottom variant="h4" component="div">
              {props.character.name}
            </Typography>
            <Typography variant="body2" color={statusColor}>
              {props.character.status}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={handleClickOpen}>
              Open Card
            </Button>
          </CardActions>
        </Card>
      </ButtonBase>
    </>
  );
};
