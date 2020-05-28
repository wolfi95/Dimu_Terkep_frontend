import React, { Component, ChangeEvent } from "react";
import instance from "./api/api";
import { IIntezmenyHeader } from "./interfaces/InstituteInterfaces";
import {
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Container,
} from "@material-ui/core";
import { appHistory } from ".";

interface IAdminPageState {
  Intezmenyek: IIntezmenyHeader[];
  searchParam: string;
}

export class Admin extends Component<{}, IAdminPageState> {
  /**
   *
   */
  constructor(props: IAdminPageState) {
    super(props);
    this.state = {
      Intezmenyek: [],
      searchParam: "",
    };

    instance.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
    instance.post("Intezmeny/intezmenyHeaders/").then((res) => {
      this.setState({ Intezmenyek: res.data });
    });
  }

  handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (event.currentTarget.name) {
      case "searchName": {
        this.setState({ searchParam: event.currentTarget.value }, () =>
          instance
            .post(
              "Intezmeny/intezmenyHeaders?searchParam=" + this.state.searchParam
            )
            .then((res) => {
              this.setState({ Intezmenyek: res.data });
            })
        );

        break;
      }
    }
  };

  editIntezmeny = (id: string) => {
    appHistory.push("/admin/edit/" + id);
  };

  logOut = () => {
    localStorage.clear();
    appHistory.push("/");
  };

  render() {
    return (
      <Container>
        <div className="rowFlex">
          <h1>Intézmények szerkesztése</h1>
          <div className="rowFlex menuButtons">
          <Button onClick={() => appHistory.push("/")}>Térkép</Button>
          <Button onClick={this.logOut}>Kijelentkezés</Button>
          </div>
        </div>
        <br />
        <Button onClick={() => this.editIntezmeny("")} variant="outlined">Új intézmény</Button>
        <TextField
          className="editSearchText"
          id="instSearch"
          name="searchName"
          type="search"
          value={this.state.searchParam}
          label="Keresés intézmény név alapján"
          variant="filled"
          onChange={(event) => this.handleChange(event)}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Intézmény név</TableCell>
              <TableCell>Alapítás</TableCell>
              <TableCell>Megszűnés</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.Intezmenyek.map((intezmeny) => (
              <TableRow key={intezmeny.nev}>
                <TableCell>{intezmeny.nev}</TableCell>
                <TableCell>{intezmeny.alapitas}</TableCell>
                <TableCell>{intezmeny.megszunes}</TableCell>
                <TableCell>
                  <Button
                    className="editButton"
                    onClick={() => this.editIntezmeny(intezmeny.intezmenyId)}
                  >
                    &#9998;
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    );
  }
}

export default Admin;
