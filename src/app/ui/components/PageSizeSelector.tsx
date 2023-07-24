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
        data-testid="select"
        id="page-size-selector"
        value={props.pageSize}
        label="Characters"
        onChange={handleChange}
      >
        <MenuItem data-testid="select-option-20" value={"20"}>
          20
        </MenuItem>
        <MenuItem data-testid="select-option-50" value={"50"}>
          50
        </MenuItem>
      </Select>
    </FormControl>
  );
};
