import React from "react";
import { Checkbox, FormControlLabel } from "@material-ui/core";

class InstFilter extends React.Component<{}, { checkedValues: Array<number> }> {
    constructor(props) {
    super(props);
    this.handleFilter = this.handleFilter.bind(this);
    this.state = {
      checkedValues: [0,1,2,3,4,5,6,7,8,9,10,11],
    };
  }
  handleFilter(instituteType) {
    this.setState((state) => ({
        checkedValues: state.checkedValues.includes(instituteType) ? state.checkedValues.filter(i => i !== instituteType) : [ ...state.checkedValues, instituteType ]
    }));
    console.log(this.state.checkedValues);
  }

  labelList = [
    { label: "Állami Múzeum", id: 0 },
    { label: "Állami Kulturális Intézet", id: 1 },
    { label: "Önkormányzati Múzeum", id: 2 },
    { label: "Önkormanyzati Kulturális Központ", id: 3 },
    { label: "Önkormanyzati Galéria", id: 4 },
    { label: "Kereskedelmi Galéria", id: 5 },
    { label: "Független Kulturális Intézmény", id: 6 },
    { label: "Non Profit Galéria", id: 7 },
    { label: "Kulturális Intézet", id: 8 },
    { label: "Egyesület", id: 9 },
    { label: "Oktatási Intézmény", id: 10 },
    { label: "Étterem Kocsma Galéria", id: 11 },
  ];

  render() {
    return (
      <div className="filterBlock">
        {this.labelList.map((element) => (
          <FormControlLabel
            control={<Checkbox key={element.id} />}
            label={element.label}
            onChange={this.handleFilter.bind(this, element.id)}
            checked={this.state.checkedValues.includes(element.id)}
          />
        ))}
      </div>
    );
  }
}

export default InstFilter;
