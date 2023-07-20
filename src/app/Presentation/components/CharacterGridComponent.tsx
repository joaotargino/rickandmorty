import { Grid } from "@mui/material";
import { CharacterCard } from "./CharacterCard";
import React from "react";
import { Character } from "@/app/data/model/interface";

export const CharacterGridComponent: React.FC<{ data: Character[] }> = (
  props
) => {
  console.log(props.data, "GRID");
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
        <Grid item xs={"auto"} sm={"auto"} md={"auto"} key={index}>
          <CharacterCard character={c} />
        </Grid>
      ))}
    </Grid>
  );
};
