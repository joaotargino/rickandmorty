import styled from "@emotion/styled";
import { Button } from "@mui/material";
import React from "react";

const PaginationSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-around;
  width: 50%;
`;

export const PaginationSection: React.FC<{
  page: number;
  hasPrevious: boolean;
  hasNext: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  return (
    <PaginationSectionContainer>
      <Button
        variant="contained"
        onClick={() => props.setPage(props.page - 1)}
        disabled={!props.hasPrevious}
        data-testid="previous-page-button"
      >
        Previous
      </Button>
      {props.page}
      <Button
        variant="contained"
        onClick={() => props.setPage(props.page + 1)}
        disabled={!props.hasNext}
        data-testid="next-page-button"
      >
        Next
      </Button>
    </PaginationSectionContainer>
  );
};
