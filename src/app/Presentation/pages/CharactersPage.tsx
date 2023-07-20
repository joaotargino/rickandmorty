"use client";

import React, { useEffect, useState } from "react";

import { fetchCharacters } from "../../api/RickAndMortyAPIClient";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import { Button, Grid, TextField } from "@mui/material";
import { CharacterCard } from "../components/CharacterCard";
import styled from "@emotion/styled";
import { ErrorPopup } from "../components/modal/ErrorPopup";
import { LoadingPopup } from "../components/modal/LoadingPopup";
import { PageSizeSelector } from "../components/PageSizeSelector";
import { PaginationSection } from "../components/PaginationSection";

const CharactersPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #91b0ba;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
`;

const FilterPaginationContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: center;
  max-width: 600px;
  padding: 5px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: row;

  width: 50%;
`;

const SectionDivider = styled.div`
  height: 10px;
`;
export const CharactersPage: React.FC = () => {
  const [item, setItem] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState("20");
  const [isLoading, setIsLoading] = useState(true);

  const { status, data, refetch } = useQuery(
    //observes when there is a change in the page and fetch for the next page
    ["characters", page], //["characters", item] real time query
    () => fetchCharacters(item, page)
  );

  console.log("data", data, data?.error);

  useEffect(() => {
    setIsLoading(status === "loading");
  }, [status]);

  const handleFilter = () => {
    refetch();
    setPage(1);

    console.log(item);
  };

  const handleError = () => {
    setPage(1);
    setItem("");
    refetch();
  };

  const handleReload = () => {    
    refetch();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setItem(e.currentTarget.value);
  };

  return (
    <CharactersPageContainer>
      <>
        {isLoading || (page === 1 && data === undefined) ? (
          <LoadingPopup isOpen={isLoading} handleClose={handleReload}/>
        ) : null}

        {data?.error ? (
          <Typography variant="h6">{data.error}</Typography>
        ) : null}

        {data?.error ? (
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

      {data?.error ? (
        <ErrorPopup
          handleClose={handleError}
          isOpen={data?.error}
          title={"Wubba Lubba Dub Dub"}
          message={data?.error}
        />
      ) : null}
      {status === "success" && data.results ? (
        <>
          <FilterPaginationContainer>
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
            <PageSizeSelector
              pageSize={pageSize}
              handleChange={setPageSize}
            ></PageSizeSelector>
            <SectionDivider />
            <PaginationSection data={data} page={page} setPage={setPage} />
          </FilterPaginationContainer>
          <SectionDivider />
          <Grid
            container
            spacing={1}
            sx={{ width: "auto", maxWidth: '1500px',marginLeft: "128px", alignSelf: "center" }}
          >
            {data.results.map((c, index) => (
              <Grid item xs={"auto"} sm={"auto"} md={"auto"} key={index}>
                <CharacterCard character={c} />
              </Grid>
            ))}
          </Grid>
        </>
      ) : null}
    </CharactersPageContainer>
  );
};
