import React, { useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { Select } from "@material-ui/core";
import { SearchTypeId, SearchTypeName } from "../enums/enums";

const InstituteSearch = (props) => {
  const [searchFieldLabel, setSearchFieldLabel] = useState(
    SearchTypeName.IntezmenyNev as string
  );
  const [searchFieldText, setSearchFieldText] = useState("");
  let menuItems: string[] = [];
  for (const key in SearchTypeName) {
    menuItems.push(SearchTypeName[key]);
  }
  const handleChange = (event) => {
    setSearchFieldText(event.target.value);
    props.onSearchValChange(event.target.value);
  };
  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSearchFieldLabel(event.target.value as string);
    setSearchFieldText("");
    let searchTypeTerm = "";
    switch (event.target.value) {
      case SearchTypeName.IntezmenyNev:
        searchTypeTerm = SearchTypeId.IntezmenyNev;
        break;
      case SearchTypeName.IntezmenyCim:
        searchTypeTerm = SearchTypeId.IntezmenyCim;
        break;
      case SearchTypeName.IntezmenyVezeto:
        searchTypeTerm = SearchTypeId.IntezmenyVezeto;
        break;
    }
    props.onSearchTypeChange(searchTypeTerm as string);
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
