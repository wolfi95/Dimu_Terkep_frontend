import React, { Component, ChangeEvent } from "react";
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { IIntezmeny, IIntezmenyHelyszin, IEsemeny, IIntezmenyVezeto } from "./interfaces/InstituteInterfaces";
import { appHistory } from ".";
import instance from "./api/api";

interface IEditPageState {
    new: boolean;
    intezmeny: IIntezmeny;
    openHelyszinDialog: boolean;
    editingHelyszin: IIntezmenyHelyszin | null;
    editableHelyszin: IIntezmenyHelyszin | null;
    openEsemenyDialog: boolean;
    editingEsemeny: IEsemeny | null;
    editableEsemeny: IEsemeny | null;
    openVezetoDialog: boolean;
    editableVezeto: IIntezmenyVezeto | null;
    editingVezeto: IIntezmenyVezeto | null;
}

export class Edit extends Component<{}, IEditPageState> {
  /**
   *
   */
  constructor(props: IEditPageState) {
    super(props);
    instance.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
    var id = appHistory.location.pathname.split("/").pop();
    this.state = {
      new: id === "",      
      openHelyszinDialog: false,
      editableHelyszin: null,
      editingHelyszin: null,
      openVezetoDialog: false,
      editingVezeto: null,
      editableVezeto: null,
      openEsemenyDialog:false,
      editableEsemeny: null,
      editingEsemeny: null,
      intezmeny: {
        alapitas: 0,
        esemenyek: [],
        intezmenyHelyszinek: [],
        intezmenyId: "",
        intezmenyVezetok: [],
        leiras: "",
        link: "",
        megszunes: 0,
        nev: "",
        tipus: 0,
      },
    };
    if (id != ""){
      instance.get<IIntezmeny>("/Intezmeny/" + id).then((res) => {
        this.setState({
          intezmeny: {
            ...res.data,
            megszunes: res.data.megszunes !== null ? res.data.megszunes : 0,
          },
        });
      });
    }
  }

  changeType = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      intezmeny: {
        ...this.state.intezmeny,
        tipus: event.target.value as number,
      },
    });
  };

  handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (event.currentTarget.name) {
      case "nev": {
        this.setState({
          intezmeny: {
            ...this.state.intezmeny,
            nev: event.currentTarget.value as string,
          },
        });
        break;
      }
      case "leiras": {
        this.setState({
          intezmeny: {
            ...this.state.intezmeny,
            leiras: event.currentTarget.value as string,
          },
        });
        break;
      }
      case "alapitas": {
        this.setState({
          intezmeny: {
            ...this.state.intezmeny,
            alapitas: +event.currentTarget.value,
          },
        });
        break;
      }
      case "megszunes": {
        this.setState({
          intezmeny: {
            ...this.state.intezmeny,
            megszunes: +event.currentTarget.value,
          },
        });
        break;
      }
      case "link": {
        this.setState({
          intezmeny: {
            ...this.state.intezmeny,
            link: event.currentTarget.value as string,
          },
        });
        break;
      }
      case "editHelyszinCim": {
        this.setState({
          editableHelyszin: {
            ...(this.state.editableHelyszin as IIntezmenyHelyszin),
            helyszin: event.currentTarget.value,
          },
        });
        break;
      }
      case "editHelyszinNyitas": {
        this.setState({
          editableHelyszin: {
            ...(this.state.editableHelyszin as IIntezmenyHelyszin),
            nyitas: +event.currentTarget.value,
          },
        });
        break;
      }
      case "editHelyszinKoltozes": {
        this.setState({
          editableHelyszin: {
            ...(this.state.editableHelyszin as IIntezmenyHelyszin),
            koltozes: +event.currentTarget.value,
          },
        });
        break;
      }
      case "editHelyszinLat": {
        this.setState({
          editableHelyszin: {
            ...(this.state.editableHelyszin as IIntezmenyHelyszin),
            latitude: +event.currentTarget.value,
          },
        });
        break;
      }
      case "editHelyszinLong": {
        this.setState({
          editableHelyszin: {
            ...(this.state.editableHelyszin as IIntezmenyHelyszin),
            longitude: +event.currentTarget.value,
          },
        });
        break;
      }
      case "editVezetoNev": {
        this.setState({
          editableVezeto: {
            ...(this.state.editableVezeto as IIntezmenyVezeto),
            nev: event.currentTarget.value,
          },
        });
        break;
      }
      case "editVezetoTol": {
        this.setState({
          editableVezeto: {
            ...(this.state.editableVezeto as IIntezmenyVezeto),
            tol: +event.currentTarget.value,
          },
        });
        break;
      }
      case "editVezetoIg": {
        this.setState({
          editableVezeto: {
            ...(this.state.editableVezeto as IIntezmenyVezeto),
            ig: +event.currentTarget.value,
          },
        });
        break;
      }
      case "editEsemenyNev": {
        this.setState({
          editableEsemeny: {
            ...(this.state.editableEsemeny as IEsemeny),
            nev: event.currentTarget.value,
          },
        });
        break;
      }
      case "editEsemenyDatum": {
        this.setState({
          editableEsemeny: {
            ...(this.state.editableEsemeny as IEsemeny),
            datum: event.currentTarget.value,
          },
        });
        break;
      }
      case "editEsemenySzervezo": {
        this.setState({
          editableEsemeny: {
            ...(this.state.editableEsemeny as IEsemeny),
            szervezo: event.currentTarget.value,
          },
        });
        break;
      }
    }
  };

  submitForm = (e) => {
    e.preventDeafult();
  };

  editHelyszin = (helyszin) => {
    var helyszintemp =
      (helyszin as IIntezmenyHelyszin) !== null
        ? helyszin
        : { helyszin: "", koltozes: 0, latitude: 0, longitude: 0, nyitas: 0 };
    this.setState(
      { openHelyszinDialog: true, editableHelyszin: helyszintemp },
      () => {
        if (helyszin !== null)
          this.setState({
            editingHelyszin: this.state.intezmeny.intezmenyHelyszinek.find(
              (i) =>
                i.helyszin === this.state.editableHelyszin?.helyszin &&
                i.nyitas === this.state.editableHelyszin?.nyitas
            ) as IIntezmenyHelyszin,
          });
      }
    );
  };

  handleHelyszinClose = (edit: boolean) => {
    if (edit) {
      var temp = this.state.intezmeny.intezmenyHelyszinek.filter(
        (i) => i !== this.state.editingHelyszin
      );
      temp.push(this.state.editableHelyszin as IIntezmenyHelyszin);
      this.setState({
        intezmeny: { ...this.state.intezmeny, intezmenyHelyszinek: temp },
      });
    }
    this.setState({ openHelyszinDialog: false, editingHelyszin: null });
  };

  deleteHelyszin = (helyszin) => {
    var temp = this.state.intezmeny.intezmenyHelyszinek;
    temp = temp.filter((i) => i !== helyszin);
    this.setState({
      intezmeny: {
        ...this.state.intezmeny,
        intezmenyHelyszinek: temp,
      },
    });
  };

  handleVezetoClose = (edit: boolean) => {
    if (edit) {
      var temp = this.state.intezmeny.intezmenyVezetok.filter(
        (i) => i !== this.state.editableVezeto
      );
      temp.push(this.state.editableVezeto as IIntezmenyVezeto);
      this.setState({
        intezmeny: { ...this.state.intezmeny, intezmenyVezetok: temp },
      });
    }
    this.setState({ openVezetoDialog: false, editingVezeto: null });
  };

  deleteVezeto = (vezeto) => {
    var temp = this.state.intezmeny.intezmenyVezetok;
    temp = temp.filter((i) => i !== vezeto);
    this.setState({
      intezmeny: {
        ...this.state.intezmeny,
        intezmenyVezetok: temp,
      },
    });
  };

  editIntezmenyVezeto = (vezeto) => {
    var vezetoTemp =
      (vezeto as IIntezmenyVezeto) !== null
        ? vezeto
        : { nev: "", tol: 0, ig: 0 };
    this.setState(
      { openVezetoDialog: true, editableVezeto: vezetoTemp },
      () => {
        if (vezeto !== null)
          this.setState({
            editingVezeto: this.state.intezmeny.intezmenyVezetok.find(
              (i) =>
                i.nev === this.state.editableVezeto?.nev &&
                i.tol === this.state.editableVezeto?.tol &&
                i.ig === this.state.editableVezeto?.ig
            ) as IIntezmenyVezeto,
          });
      }
    );
  };

  editEsemeny = (esemeny) => {
    var esemenytemp =
      (esemeny as IEsemeny) !== null
        ? esemeny
        : { nev: "", datum: "", szervezo: "" };
    this.setState(
      { openEsemenyDialog: true, editableEsemeny: esemenytemp },
      () => {
        if (esemeny !== null)
          this.setState({
            editingEsemeny: this.state.intezmeny.esemenyek.find(
              (i) =>
                i.nev === this.state.editableEsemeny?.nev &&
                i.datum === this.state.editableEsemeny?.datum
            ) as IEsemeny,
          });
      }
    );
  };

  handleEsemenyClose = (edit: boolean) => {
    if (edit) {
      var temp = this.state.intezmeny.esemenyek.filter(
        (i) => i !== this.state.editingEsemeny
      );
      temp.push(this.state.editableEsemeny as IEsemeny);
      this.setState({
        intezmeny: { ...this.state.intezmeny, esemenyek: temp },
      });
    }
    this.setState({ openEsemenyDialog: false, editingEsemeny: null });
  };

  deleteEsemeny = (esemeny) => {
    var temp = this.state.intezmeny.esemenyek;
    temp = temp.filter((i) => i !== esemeny);
    this.setState({
      intezmeny: {
        ...this.state.intezmeny,
        esemenyek: temp,
      },
    });
  };

  postIntezmeny = (e) => {
    e.preventDefault();
    var id = appHistory.location.pathname.split("/").pop();
    if (id != "") {
      instance.put("Intezmeny/" + id, this.state.intezmeny).then((res) => {
        appHistory.push("/admin");
      });
    } else {
      instance.post("Intezmeny/new", this.state.intezmeny).then((res) => {
        appHistory.push("/admin");
      });
    }
  };

  goBack = (e) => {
    e.preventDefault();
    appHistory.push("/admin");
  };

  render() {
    return (
      <Container>
        <h1>Intézmény módosítása</h1>
         {!this.state.new && <h2>{this.state.intezmeny.nev}</h2>}

        <form onSubmit={this.submitForm} className="bottomMargin">
          <div className="editGroup">
          {this.state.new && <TextField
              fullWidth={true}
              value={this.state.intezmeny.nev}
              multiline={true}
              name="nev"
              label="Intézmény neve"
              onChange={this.handleChange}
            />
          }
            <TextField
              fullWidth={true}
              value={this.state.intezmeny.leiras}
              multiline={true}
              name="leiras"
              label="Leírás"
              onChange={this.handleChange}
            />
          </div>
          <div className="editGroup">
            <TextField
              value={this.state.intezmeny.alapitas}
              type="number"
              name="alapitas"
              label="Alapítás"
              onChange={this.handleChange}
            />
          </div>
          <div className="editGroup">
            <TextField
              value={this.state.intezmeny.megszunes}
              type="number"
              name="megszunes"
              label="Megszűnés"
              onChange={this.handleChange}
            />
          </div>
          <div className="editGroup">
            <TextField
              fullWidth={true}
              value={this.state.intezmeny.link}
              multiline={true}
              name="link"
              label="Linkek"
              onChange={this.handleChange}
            />
          </div>
          <div className="editGroup">
            <InputLabel>Intézmény típusa</InputLabel>
            <Select
              name="tipus"
              label="Intézmény típusa"
              value={this.state.intezmeny.tipus}
              onChange={this.changeType}
            >
              <MenuItem value={0}>Állami múzeum</MenuItem>
              <MenuItem value={1}>Állami kulturális központ</MenuItem>
              <MenuItem value={2}>Önkormányzat múzeum</MenuItem>
              <MenuItem value={3}>Önkormányzati kulturális központ</MenuItem>
              <MenuItem value={4}>Önkormányzati galéria</MenuItem>
              <MenuItem value={5}>Kereskedelmi galéria</MenuItem>
              <MenuItem value={6}>Független kulturális intézmény</MenuItem>
              <MenuItem value={7}>Non profit galéria</MenuItem>
              <MenuItem value={8}>Kulturális intézet</MenuItem>
              <MenuItem value={9}>Egyesület</MenuItem>
              <MenuItem value={10}>Oktatási intézmény</MenuItem>
              <MenuItem value={11}>Étterem, kocsma galéria</MenuItem>
            </Select>
          </div>
          <div className="editGroup">
            <InputLabel>Helyszínek</InputLabel>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Cím</TableCell>
                  <TableCell>Nyitás</TableCell>
                  <TableCell>Zárás</TableCell>
                  <TableCell>Műveletek</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.intezmeny.intezmenyHelyszinek.map((helyszin) => {
                  return (
                    <TableRow key={helyszin.helyszin + helyszin.nyitas}>
                      <TableCell>{helyszin.helyszin}</TableCell>
                      <TableCell>{helyszin.nyitas}</TableCell>
                      <TableCell>{helyszin.koltozes}</TableCell>
                      <TableCell>
                        <Button
                          className="editButton"
                          onClick={() => this.editHelyszin(helyszin)}
                        >
                          &#9998;
                        </Button>
                        <Button
                          className="editButton"
                          onClick={() => this.deleteHelyszin(helyszin)}
                        >
                          &#128465;
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Button onClick={() => this.editHelyszin(null)}>
              &#10133; Hozzáad
            </Button>
          </div>
          <div className="editGroup">
            <InputLabel>Intézményvezetők</InputLabel>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Név</TableCell>
                  <TableCell>Től</TableCell>
                  <TableCell>Ig</TableCell>
                  <TableCell>Műveletek</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.intezmeny.intezmenyVezetok.map(
                  (intezmenyVezeto) => {
                    return (
                      <TableRow key={intezmenyVezeto.nev + intezmenyVezeto.tol}>
                        <TableCell>{intezmenyVezeto.nev}</TableCell>
                        <TableCell>{intezmenyVezeto.tol}</TableCell>
                        <TableCell>{intezmenyVezeto.ig}</TableCell>
                        <TableCell>
                          <Button
                            className="editButton"
                            onClick={() =>
                              this.editIntezmenyVezeto(intezmenyVezeto)
                            }
                          >
                            &#9998;
                          </Button>
                          <Button
                            className="editButton"
                            onClick={() => this.deleteVezeto(intezmenyVezeto)}
                          >
                            &#128465;
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
            <Button onClick={() => this.editIntezmenyVezeto(null)}>&#10133; Hozzáad</Button>
          </div>

          <div className="editGroup">
            <InputLabel>Események</InputLabel>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Név</TableCell>
                  <TableCell>Szervező</TableCell>
                  <TableCell>Dátum</TableCell>
                  <TableCell>Műveletek</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.intezmeny.esemenyek.map((esemeny) => {
                  return (
                    <TableRow key={esemeny.nev + esemeny.datum}>
                      <TableCell>{esemeny.nev}</TableCell>
                      <TableCell>{esemeny.szervezo}</TableCell>
                      <TableCell>{esemeny.datum}</TableCell>
                      <TableCell>
                        <Button
                          className="editButton"
                          onClick={() => this.editEsemeny(esemeny)}
                        >
                          &#9998;
                        </Button>
                        <Button
                          className="editButton"
                          onClick={() => this.deleteEsemeny(esemeny)}
                        >
                          &#128465;
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Button onClick={() => this.editEsemeny(null)}>
              &#10133; Hozzáad
            </Button>
          </div>

          <div className="rowFlex ">
            <Button
              color="primary"
              variant="contained"
              type="submit"
              onClick={this.postIntezmeny}
            >
              Módosít
            </Button>
            <Button color="primary" variant="contained" onClick={this.goBack}>
              Mégse
            </Button>
          </div>
        </form>

        <Dialog
          open={this.state.openVezetoDialog}
          onClose={this.handleVezetoClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.editingVezeto !== null
              ? "Intézményvezető módosítása"
              : "Új intézményvezeto"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Név"
              type="text"
              name="editVezetoNev"
              fullWidth
              value={this.state.editableVezeto?.nev}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Tól"
              type="number"
              name="editVezetoTol"
              fullWidth
              value={this.state.editableVezeto?.tol}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Ig"
              type="number"
              name="editVezetoIg"
              fullWidth
              value={this.state.editableVezeto?.ig}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleVezetoClose(true)}
              color="primary"
            >
              {this.state.editingVezeto !== null ? "Módosítás" : "Felvesz"}
            </Button>
            <Button
              onClick={() => this.handleVezetoClose(false)}
              color="primary"
            >
              Mégse
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.openHelyszinDialog}
          onClose={this.handleHelyszinClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.editingHelyszin !== null
              ? "Helyszín módosítása"
              : "Új helyszín"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Cím"
              type="text"
              name="editHelyszinCim"
              fullWidth
              value={this.state.editableHelyszin?.helyszin}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nyitás"
              type="number"
              name="editHelyszinNyitas"
              fullWidth
              value={this.state.editableHelyszin?.nyitas}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Költözés"
              type="number"
              name="editHelyszinKoltozes"
              fullWidth
              value={this.state.editableHelyszin?.koltozes}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Latitude"
              type="number"
              name="editHelyszinLat"
              fullWidth
              value={this.state.editableHelyszin?.latitude}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Longitude"
              type="number"
              name="editHelyszinLong"
              fullWidth
              value={this.state.editableHelyszin?.longitude}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleHelyszinClose(true)}
              color="primary"
            >
              {this.state.editingHelyszin !== null ? "Módosítása" : "Felvesz"}
            </Button>
            <Button
              onClick={() => this.handleHelyszinClose(false)}
              color="primary"
            >
              Mégse
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={this.state.openHelyszinDialog} onClose={this.handleHelyszinClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{this.state.editingHelyszin !== null ? "Helyszín módosítása" : "Új helyszín"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Cím"
            type="text"
            name="editHelyszinCim"
            fullWidth
            value={this.state.editableHelyszin?.helyszin}
            onChange={this.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nyitás"
            type="number"
            name="editHelyszinNyitas"
            fullWidth
            value={this.state.editableHelyszin?.nyitas}
            onChange={this.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Költözés"
            type="number"
            name="editHelyszinKoltozes"
            fullWidth
            value={this.state.editableHelyszin?.koltozes}
            onChange={this.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Latitude"
            type="number"
            name="editHelyszinLat"
            fullWidth
            value={this.state.editableHelyszin?.latitude}
            onChange={this.handleChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Longitude"
            type="number"
            name="editHelyszinLong"
            fullWidth
            value={this.state.editableHelyszin?.longitude}
            onChange={this.handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleHelyszinClose(true)} color="primary">
            {this.state.editingHelyszin !== null ? "Módosítás" : "Felvesz"}
          </Button>
          <Button onClick={() => this.handleHelyszinClose(false)} color="primary">
            Mégse
          </Button>
        </DialogActions>
      </Dialog>

        <Dialog
          open={this.state.openEsemenyDialog}
          onClose={this.handleEsemenyClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {this.state.editingEsemeny !== null
              ? "Esemény módosítása"
              : "Új esemény"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Név"
              type="text"
              name="editEsemenyNev"
              fullWidth
              value={this.state.editableEsemeny?.nev}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Dátum"
              type="text"
              name="editEsemenyDatum"
              fullWidth
              value={this.state.editableEsemeny?.datum}
              onChange={this.handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Szervezo"
              type="text"
              name="editEsemenySzervezo"
              fullWidth
              value={this.state.editableEsemeny?.szervezo}
              onChange={this.handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.handleEsemenyClose(true)}
              color="primary"
            >
              {this.state.editingHelyszin !== null ? "Módosítás" : "Felvesz"}
            </Button>
            <Button
              onClick={() => this.handleEsemenyClose(false)}
              color="primary"
            >
              Mégse
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  }
}

export default Edit;
