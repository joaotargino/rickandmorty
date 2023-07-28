import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import useTranslation from "next-translate/useTranslation";

const pageSizes = [
  { id: 1, name: "20" },
  { id: 2, name: "50" },
  // { id: 3, name: "100" },
];

export const PageSizeSelector: React.FC<{
  pageSize: string;
  handleChange: React.Dispatch<React.SetStateAction<string>>;
  resetPage: () => void;
}> = (props) => {
  const handleChange = (event: SelectChangeEvent<string>): void => {
    props.resetPage();
    props.handleChange(event.target.value);
  };

  const { t, lang } = useTranslation("common");

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label-input">{t("results-pp")}</InputLabel>
      <Select
        labelId="select-label"
        data-testid="select"
        id="page-size-selector"
        value={props.pageSize}
        label="Characters"
        onChange={handleChange}
      >
        {pageSizes.map((item) => (
          <MenuItem
            data-testid={`select-option-${item.name}`}
            value={item.name}
            key={item.id}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
