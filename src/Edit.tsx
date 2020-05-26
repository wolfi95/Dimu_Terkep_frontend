import React, { Component, ChangeEvent } from "react";
import { Container, Button, TextField, Select, MenuItem, Table, TableHead, TableCell, TableRow, TableBody, InputLabel } from "@material-ui/core";
import { IIntezmeny } from "./interfaces/InstituteInterfaces";
import { appHistory } from ".";
import instance from "./api/api";

interface IEditPageState {
    intezmeny: IIntezmeny
}

export class Edit extends Component<{},IEditPageState> {
    /**
     *
     */
    constructor({}) {
        super({});
        var id = appHistory.location.pathname.split('/').pop();        
        this.state = {
            intezmeny: {
                alapitas : 0,
                esemenyek : [],
                intezmenyHelyszinek: [],
                intezmenyId : "",
                intezmenyVezetok: [],
                leiras: "",
                link: "",
                megszunes: 0,
                nev: "",
                tipus: -1
            }
        };
        instance.get<IIntezmeny>("/Intezmeny/" + id)
            .then(res => {
                this.setState({                    
                    intezmeny: {
                        ...res.data,
                        megszunes: res.data.megszunes !== null ? res.data.megszunes : 0
                    }
                });
            })
    } 
    
    handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | {value: unknown, name?: string}>) => {
        switch (event.currentTarget.name) {
          case "email": {
            break;
          }
        }
      };

    submitForm = (e) => {
        e.preventDeafult();
    }

    editHelyszin = () => {

    }

    editIntezmenyVezeto = () => {

    }

    editEsemeny = () => {

    }

    render() {
        return (
            <Container>
                <h1>
                    Intézmény módosítása
                </h1>
                <h2>
                    {this.state.intezmeny.nev}
                </h2>

                <form onSubmit={this.submitForm}>
                    <div className="editGroup">
                        <TextField                        
                            fullWidth={true}
                            value={this.state.intezmeny.leiras}
                            multiline={true}
                            name="leiras"
                            label="Leírás"
                            onChange={this.handleChange}/>
                    </div>
                    <div className="editGroup">
                        <TextField
                            value={this.state.intezmeny.alapitas}
                            type="number"
                            name="alapitas"
                            label="Alapítás"
                            onChange={this.handleChange}/>
                    </div>
                    <div className="editGroup">
                        <TextField
                            value={this.state.intezmeny.megszunes}
                            type="number"
                            name="megszunes"
                            label="Megszűnés"
                            onChange={this.handleChange}/>
                    </div>
                    <div className="editGroup">
                        <TextField                        
                            fullWidth={true}
                            value={this.state.intezmeny.link}
                            multiline={true}
                            name="link"
                            label="Linkek"
                            onChange={this.handleChange}/>
                    </div>
                    <div className="editGroup">
                        <InputLabel>Intézmény típusa</InputLabel>
                        <Select
                            name="tipus"
                            label="Intézmény típusa"
                            value={this.state.intezmeny.tipus}
                            onChange={this.handleChange}>
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
                                {this.state.intezmeny.intezmenyHelyszinek.map(helyszin =>{
                                    return (
                                        <TableRow key={helyszin.helyszin+helyszin.nyitas}>
                                            <TableCell>{helyszin.helyszin}</TableCell>
                                            <TableCell>{helyszin.nyitas}</TableCell>
                                            <TableCell>{helyszin.koltozes}</TableCell>
                                            <TableCell>
                                                <Button className="editButton" onClick={() => this.editHelyszin()}>
                                                    &#9998;
                                                </Button>
                                                <Button className="editButton">
                                                    &#128465;
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        <Button>
                            &#10133; Hozzáad
                        </Button>
                    </div>
                    <div className="editGroup">
                        <InputLabel>Művészek</InputLabel>
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
                                {this.state.intezmeny.intezmenyVezetok.map(intezmenyVezeto =>{
                                    return (
                                        <TableRow key={intezmenyVezeto.nev+intezmenyVezeto.tol}>
                                            <TableCell>{intezmenyVezeto.nev}</TableCell>
                                            <TableCell>{intezmenyVezeto.tol}</TableCell>
                                            <TableCell>{intezmenyVezeto.ig}</TableCell>
                                            <TableCell>
                                                <Button className="editButton" onClick={() => this.editIntezmenyVezeto()}>
                                                    &#9998;
                                                </Button>
                                                <Button className="editButton">
                                                    &#128465;
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        <Button>
                            &#10133; Hozzáad
                        </Button>
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
                                {this.state.intezmeny.esemenyek.map(esemeny =>{
                                    return (
                                        <TableRow key={esemeny.nev+esemeny.datum}>
                                            <TableCell>{esemeny.nev}</TableCell>
                                            <TableCell>{esemeny.szervezo}</TableCell>
                                            <TableCell>{esemeny.datum}</TableCell>
                                            <TableCell>
                                                <Button className="editButton" onClick={() => this.editEsemeny()}>
                                                    &#9998;
                                                </Button>
                                                <Button className="editButton">
                                                    &#128465;
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                        <Button>
                            &#10133; Hozzáad
                        </Button>
                    </div>
                    
                    <div>
                        <Button 
                            color="primary"
                            variant="contained"
                            type="submit">  
                            Módosít
                        </Button>
                    </div>
                </form>

            </Container>
        );
    }
    
}

export default Edit;