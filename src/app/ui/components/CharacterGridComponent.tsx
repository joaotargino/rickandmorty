import { Grid } from "@mui/material";
import { CharacterCard } from "./CharacterCard";
import React from "react";
import { Character } from "@/app/data/model/interface";

export const CharacterGridComponent: React.FC<{ data: Character[] }> = (
  props
) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        width: "auto",
        maxWidth: "1500px",
        marginLeft: "128px",
        alignSelf: "center",
      }}
    >
      {props.data.map((c: Character, index: number) => (
        <Grid
          item
          xs={"auto"}
          sm={"auto"}
          md={"auto"}
          key={index}
          data-testid="characters-grid"
        >
          <CharacterCard character={c} data-testid="character-card" />
        </Grid>
      ))}
    </Grid>
  );
};
