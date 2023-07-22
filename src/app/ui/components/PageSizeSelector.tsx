import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export const PageSizeSelector: React.FC<{
  pageSize: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  resetPage: () => void;
}> = (props) => {
  const handleChange = (event: SelectChangeEvent<string>): void => {
    props.resetPage();
    props.handleChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">Results per page</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={props.pageSize}
        label="Characters"
        onChange={handleChange}
      >
        <MenuItem value={"20"}>20</MenuItem>
        <MenuItem value={"50"}>50</MenuItem>
      </Select>
    </FormControl>
  );
};
