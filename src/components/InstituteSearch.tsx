import React from "react";
import { TextField } from "@material-ui/core";

class InstituteSearch extends React.Component {

    render() {
        return (
          <div className="searchBlock">
              <TextField id="instSearch" type="search" label="Intézmény keresés" variant="filled" />
          </div>
        );
      }
}

export default InstituteSearch;