import { Grid } from "@mui/material"
import { CharacterCard } from "./CharacterCard"

export const CharacterGridComponent : React.FC<{data: any}> = (props) => {

    return (

        <Grid
            container
            spacing={1}
            sx={{ width: "auto", maxWidth: '1500px',marginLeft: "128px", alignSelf: "center" }}
          >
            {props.data.results.map((c, index) => (
              <Grid item xs={"auto"} sm={"auto"} md={"auto"} key={index}>
                <CharacterCard character={c} />
              </Grid>
            ))}
          </Grid>
    )
}