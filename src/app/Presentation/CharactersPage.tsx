"use client"; // This is a client component 👈🏽

import React, { useState } from "react";

import { fetchCharacters } from "../api/RickAndMortyAPIClient";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import { CharacterCard } from "../Presentation/CharacterCard";
import styled from "@emotion/styled";

const CharactersPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #91b0ba;
  padding: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  width: 50%;
`;

const PaginationSection = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-between;
  width: 50%;
`;

const SectionDivider = styled.div`
  height: 10px;
`;
export const CharactersPage: React.FC = () => {
  const [item, setItem] = useState("");
  const [page, setPage] = useState(1);

  const { status, data, refetch } = useQuery(
    ["characters", page], //["characters", item] real time query
    () => fetchCharacters(item, page)
  );

  console.log("data", data, data?.error);

  const handleFilter = () => {
    refetch();
    setPage(1);

    console.log(item);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setItem(e.currentTarget.value);
  };

  return (
    <CharactersPageContainer>
      <>
        {status === "loading" ? (
          <Typography variant="h6">LOADING...</Typography>
        ) : null}

        {data?.error ? (
          <Typography variant="h6">{data?.error}</Typography>
        ) : null}

        {status === "loading" || data?.error ? (
          <Button
            variant="contained"
            onClick={() => {
              setItem("");
              refetch();
            }}
          >
            Try again
          </Button>
        ) : null}
      </>
      {status === "success" && data.results ? (
        <>
          <FilterSection>
            <TextField
              id="filled-basic"
              label="Filter by name"
              variant="filled"
              type="text"
              value={item}
              onChange={onChange}
              style={{ minWidth: "600px", marginRight: "10px" }}
            />

            <Button variant="contained" onClick={handleFilter}>
              Filter
            </Button>
          </FilterSection>
          <SectionDivider />
          <PaginationSection>
            <Button
              variant="contained"
              onClick={() => setPage(page - 1)}
              disabled={!data.info.prev}
            >
              Previous
            </Button>
            {page}
            <Button
              variant="contained"
              onClick={() => setPage(page + 1)}
              disabled={!data.info.next}
            >
              Next
            </Button>
          </PaginationSection>
          <SectionDivider />
          <Grid container spacing={1}>
            {data.results.map((c, index) => (
              <Grid item xs={4} sm={4} md={4} key={index}>
                <CharacterCard character={c} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
    </CharactersPageContainer>
  );
};
