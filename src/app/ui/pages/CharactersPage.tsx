"use client";

import React, { useEffect, useState } from "react";

import {
  fetchCharacters,
  fetchCharactersByListOfIDs,
} from "../../api/RickAndMortyAPIClient";
import { useQuery } from "@tanstack/react-query";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { ErrorPopup } from "../components/modal/ErrorPopup";
import { LoadingPopup } from "../components/modal/LoadingPopup";
import { PageSizeSelector } from "../components/PageSizeSelector";
import { PaginationSection } from "../components/PaginationSection";
import { CharacterGridComponent } from "../components/CharacterGridComponent";
import { ApiResponse, Character, Info } from "@/app/data/model/interface";
import { AxiosError } from "axios";
// import useIsMobile from "@/app/util/Hooks";

const CharactersPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #91b0ba;
  padding: 20px;
  min-height: 100vh;
  width: 100%;
  padding-bottom: 128px;
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

const RESULTS_PER_PAGE_SMALL = "20";
const RESULTS_PER_PAGE_BIG = "50";
export const CharactersPage: React.FC = () => {
  const isMobile = false; // useIsMobile();

  const [pageSize, setPageSize] = useState(RESULTS_PER_PAGE_SMALL);
  const [listOfIDs, setListOfIDs] = useState("");
  const [item, setItem] = useState("");
  const [page, setPage] = useState(1);
  const [pageStep, setPageStep] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");

  let tempList: Character[] = [];
  const [charactersList, setCharactersList] = useState(tempList);

  const { isLoading, isFetching, isRefetching, isError, error, data, refetch } =
    useQuery<Info<any>, ApiResponse<any>>(
      //observes when there is a change in the page and fetch for the next page
      {
        queryKey: ["characters", page, pageSize, listOfIDs], //["characters", item] real time query
        queryFn: () =>
          pageSize === RESULTS_PER_PAGE_SMALL
            ? fetchCharacters(item, page)
            : fetchCharactersByListOfIDs(listOfIDs),
        onError: (error) => setErrorMessage(error.response?.data?.error),
      }
    );

  useEffect(() => {
    if (data?.results && pageSize === RESULTS_PER_PAGE_SMALL) {
      setCharactersList(data.results);
    } else if (pageSize === RESULTS_PER_PAGE_BIG) {
      let ids = "";
      for (let i = pageStep; i <= page * 50; i++) {
        ids += i + ",";
      }
      setPageStep(page * 50 - 50 + 1);
      setListOfIDs(ids.slice(0, -1));

      if (data) {
        //if 20 per page, there will be .results;
        //otherwise the array is the actual data
        setCharactersList(data.results ?? data);
      }
    }
  }, [data, page, pageSize, pageStep]);

  const handleFilter = () => {
    refetch();
    setPage(1);
  };

  const handleError = () => {
    setPage(1);
    setItem("");
  };

  const handleReload = () => {
    refetch();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setItem(e.currentTarget.value);
  };

  return (
    <CharactersPageContainer>
      <FilterPaginationContainer>
        <FilterSection
          data-testid="filter-section"
          id="filter-section"
          style={{
            minWidth: isMobile ? "300px" : "600px",
            marginRight: "10px",
          }}
        >
          {pageSize === RESULTS_PER_PAGE_SMALL ? (
            <>
              <TextField
                id="filled-basic"
                label="Filter by name"
                variant="filled"
                type="text"
                value={item}
                onChange={onChange}
                style={{
                  minWidth: isMobile ? "300px" : "600px",
                  marginRight: "10px",
                }}
              />

              <Button variant="contained" onClick={handleFilter}>
                Filter
              </Button>
            </>
          ) : null}
        </FilterSection>
        <SectionDivider />
        <PageSizeSelector
          pageSize={pageSize}
          handleChange={setPageSize}
          resetPage={() => setPage(1)}
        ></PageSizeSelector>
        <SectionDivider />
        {(data && data?.results) ||
        (pageSize === RESULTS_PER_PAGE_BIG && charactersList.length > 0) ? (
          <PaginationSection
            page={page}
            setPage={setPage}
            hasPrevious={
              (pageSize === RESULTS_PER_PAGE_SMALL &&
                data?.info?.prev !== null) ||
              (pageSize === RESULTS_PER_PAGE_BIG && page > 1)
            }
            hasNext={
              (pageSize === RESULTS_PER_PAGE_SMALL &&
                data?.info?.next !== null) ||
              (pageSize === RESULTS_PER_PAGE_BIG &&
                charactersList.length === 50)
            }
          />
        ) : null}

        <>
          {isLoading ||
          isFetching ||
          isRefetching ||
          (page === 1 && data === undefined) ? (
            <LoadingPopup
              isOpen={isLoading || isFetching || isRefetching}
              handleClose={handleReload}
              data-testid="loading-popup"
            />
          ) : null}

          {!(isLoading || isFetching || isRefetching) && isError && error ? (
            <>
              <>
                <Typography variant="h6">{errorMessage}</Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    setItem("");
                    refetch();
                  }}
                >
                  Try again
                </Button>
              </>
              <ErrorPopup
                handleClose={handleError}
                isOpen={true}
                title={"Wubba Lubba Dub Dub"}
                message={errorMessage ?? error.statusMessage}
              />
            </>
          ) : null}
        </>
      </FilterPaginationContainer>

      {(data && data.results) ||
      (pageSize === RESULTS_PER_PAGE_BIG && charactersList.length > 0) ? (
        <>
          <SectionDivider />
          <CharacterGridComponent
            data={charactersList}
            data-testid="characters"
          />

          <SectionDivider style={{ marginTop: "48px" }} />
          <PaginationSection
            data-testid="pagination-section"
            page={page}
            setPage={setPage}
            hasPrevious={
              (pageSize === RESULTS_PER_PAGE_SMALL &&
                data?.info?.prev !== null) ||
              (pageSize === RESULTS_PER_PAGE_BIG && page > 1)
            }
            hasNext={
              (pageSize === RESULTS_PER_PAGE_SMALL &&
                data?.info?.next !== null) ||
              (pageSize === RESULTS_PER_PAGE_BIG &&
                charactersList.length === 50)
            }
          />
        </>
      ) : null}
    </CharactersPageContainer>
  );
};
