import styled from "@emotion/styled";
import { Button } from "@mui/material";

const PaginationSectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-self: center;
  justify-content: space-around;
  width: 50%;
`;

export const PaginationSection: React.FC<{
  data: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}> = (props) => {
  return (
    <PaginationSectionContainer>
      <Button
        variant="contained"
        onClick={() => props.setPage(props.page - 1)}
        disabled={!props.data.info.prev}
      >
        Previous
      </Button>
      {props.page}
      <Button
        variant="contained"
        onClick={() => props.setPage(props.page + 1)}
        disabled={!props.data.info.next}
      >
        Next
      </Button>
    </PaginationSectionContainer>
  );
};
