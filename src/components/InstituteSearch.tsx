import React from "react";
import { TextField } from "@material-ui/core";

const InstituteSearch = () => {

        return (
          <div className="searchBlock">
              <TextField id="instSearch" type="search" label="Intézmény keresés" variant="filled" />
          </div>
        );
}

export default InstituteSearch;