import React from "react";
import { TextField } from "@material-ui/core";

const InstituteSearch = (props) => {
  const handleChange = (event) => {
    props.onSearchValChange(event.target.value);
  };

  return (
    <div className="searchBlock">
      <TextField
        id="instSearch"
        type="search"
        label="Intézmény keresés"
        variant="filled"
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default InstituteSearch;
