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
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { IIntezmeny, IIntezmenyHelyszin } from "./interfaces/InstituteInterfaces";
import { appHistory } from ".";
import instance from "./api/api";

interface IEditPageState {
    openHelyszinDialog: boolean;
    editing: IIntezmenyHelyszin | null;
    editableHelyszin: IIntezmenyHelyszin | null;
    intezmeny: IIntezmeny;
}

export class Edit extends Component<{}, IEditPageState> {
  /**
   *
   */
  constructor(props: IEditPageState) {
    super(props);
    instance.defaults.headers.common['Authorization'] = localStorage.getItem("token");
    var id = appHistory.location.pathname.split("/").pop();
    this.state = {
      openHelyszinDialog:false,
      editableHelyszin: null,
      editing: null,
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
        tipus: -1,
      },
    };
    instance.get<IIntezmeny>("/Intezmeny/" + id).then((res) => {
      this.setState({
        intezmeny: {
          ...res.data,
          megszunes: res.data.megszunes !== null ? res.data.megszunes : 0,
        },
      });
    });
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
         editableHelyszin:{
            ...this.state.editableHelyszin as IIntezmenyHelyszin,
            helyszin: event.currentTarget.value
         } ,
        });
        break;
      }
      case "editHelyszinNyitas": {
        this.setState({
         editableHelyszin:{
            ...this.state.editableHelyszin as IIntezmenyHelyszin,
            nyitas: +event.currentTarget.value
         } ,
        });
        break;
      }
      case "editHelyszinKoltozes": {
        this.setState({
         editableHelyszin:{
            ...this.state.editableHelyszin as IIntezmenyHelyszin,
            koltozes: +event.currentTarget.value
         } ,
        });
        break;
      }
      case "editHelyszinLat": {
        this.setState({
         editableHelyszin:{
            ...this.state.editableHelyszin as IIntezmenyHelyszin,
            latitude: +event.currentTarget.value
         } ,
        });
        break;
      }
      case "editHelyszinLong": {
        this.setState({
         editableHelyszin:{
            ...this.state.editableHelyszin as IIntezmenyHelyszin,
            longitude: +event.currentTarget.value
         } ,
        });
        break;
      }
    }
  };

  submitForm = (e) => {
    e.preventDeafult();
  };

  editHelyszin = (helyszin) => {
      var helyszintemp = helyszin as IIntezmenyHelyszin  !== null ? helyszin : {helyszin:"",koltozes:0,latitude:0,longitude:0,nyitas:0}
    this.setState({openHelyszinDialog:true,editableHelyszin:helyszintemp},() => {
        if(helyszin !== null)
        this.setState({editing: this.state.intezmeny.intezmenyHelyszinek.find(i => i.helyszin === this.state.editableHelyszin?.helyszin && i.nyitas === this.state.editableHelyszin?.nyitas) as IIntezmenyHelyszin});
    })
  };

  handleHelyszinClose = (edit:boolean) => {
      if(edit){
        var temp = this.state.intezmeny.intezmenyHelyszinek.filter(i => i !== this.state.editing)
        temp.push(this.state.editableHelyszin as IIntezmenyHelyszin);
        this.setState({intezmeny:{...this.state.intezmeny,intezmenyHelyszinek: temp}})
      }
      this.setState({openHelyszinDialog:false,editing:null})
  }

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

  editIntezmenyVezeto = () => {};

  editEsemeny = () => {};

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
    instance.put("Intezmeny/" + id,this.state.intezmeny)
        .then(res => {
            appHistory.push("/admin");
        });
  };

  goBack = (e) => {
    e.preventDefault();
    appHistory.push("/admin");
  };

  render() {
    return (
      <Container>
        <h1>Intézmény módosítása</h1>
        <h2>{this.state.intezmeny.nev}</h2>

        <form onSubmit={this.submitForm} className="bottomMargin">
          <div className="editGroup">
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
            <Button onClick={() => this.editHelyszin(null)}>&#10133; Hozzáad</Button>
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
                            onClick={() => this.editIntezmenyVezeto()}
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
            <Button>&#10133; Hozzáad</Button>
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
                          onClick={() => this.editEsemeny()}
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
            <Button>&#10133; Hozzáad</Button>
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

        <Dialog open={this.state.openHelyszinDialog} onClose={this.handleHelyszinClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">{this.state.editing !== null ? "Helyszín módosítása" : "Új helyszín"}</DialogTitle>
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
            {this.state.editing !== null ? "Módosítása" : "Felvesz"}
          </Button>
          <Button onClick={() => this.handleHelyszinClose(false)} color="primary">
            Mégse
          </Button>
        </DialogActions>
      </Dialog>
      </Container>
    );
  }
}

export default Edit;
