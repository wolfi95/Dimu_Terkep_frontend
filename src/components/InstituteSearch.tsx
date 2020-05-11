import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { Select } from "@material-ui/core";
import { SearchType } from "../enums/enums";
import { $enum } from "ts-enum-util";

const InstituteSearch = (props) => {
  const [searchFieldLabel, setSearchFieldLabel] = useState(
    SearchType[props.initSearchType] as string
  );
  const [searchFieldText, setSearchFieldText] = useState("");
  let menuItems: string[] = [];
  for (const key in SearchType) {
    menuItems.push(SearchType[key]);
  }
  const handleChange = (event) => {
    setSearchFieldText(event.target.value);
    props.onSearchValChange(event.target.value);
  };
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchFieldLabel(event.target.value as string);
    props.onSearchTypeChange($enum(SearchType).getKeyOrDefault(event.target.value as string, "IntezmenyNev"));
  };

  return (
    <div className="searchBlock">
      <FormControl variant="filled" className="searchSelectForm">
        <InputLabel id="searchSelectLabel">Keresés</InputLabel>
        <Select
          className="searchTypeSelector"
          labelId="searchSelectLabelId"
          id="SearchSelect"
          onChange={handleSelectChange}
          value={searchFieldLabel}
        >
          {menuItems.map((value, index) => (
            <MenuItem key={index} value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="instSearch"
        type="search"
        value={searchFieldText}
        label={searchFieldLabel}
        variant="filled"
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default InstituteSearch;
