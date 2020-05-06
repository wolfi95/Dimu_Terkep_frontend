import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

const InstFilter = (props) => {
  const handleChange = (id) => {
    props.onFilterChange(id);
  };

  const labelList = [
    { label: "Állami Múzeum", id: 0 },
    { label: "Állami Kulturális Intézet", id: 1 },
    { label: "Önkormányzati Múzeum", id: 2 },
    { label: "Önkormányzati Kulturális Központ", id: 3 },
    { label: "Önkormányzati Galéria", id: 4 },
    { label: "Kereskedelmi Galéria", id: 5 },
    { label: "Független Kulturális Intézmény", id: 6 },
    { label: "Non Profit Galéria", id: 7 },
    { label: "Kulturális Intézet", id: 8 },
    { label: "Egyesület", id: 9 },
    { label: "Oktatási Intézmény", id: 10 },
    { label: "Étterem, Kocsma Galéria", id: 11 },
  ];

  return (
    <div className="filterBlock">
      {labelList.map((element) => (
        <FormControlLabel
          key={element.id}
          control={<Checkbox key={element.id} />}
          label={element.label}
          onChange={() => handleChange(element.id)}
          checked={props.instTypes.includes(element.id)}
        />
      ))}
    </div>
  );
};

export default InstFilter;
