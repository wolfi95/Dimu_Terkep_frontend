export interface IIntezmeny {
  nev: string;
  alapitas: number;
  megszunes: number;
  intezmenyId: string;
  leiras: string;
  tipus: number;
  link: string;
  intezmenyHelyszinek: IIntezmenyHelyszin[];
  intezmenyVezetok: IIntezmenyVezeto[];
  esemenyek: IEsemeny[];
}
export interface IIntezmenyHeader {
  nev: string;
  alapitas: number;
  megszunes: number;
  intezmenyId: string;
}

export interface IIntezmenyVezeto {
  nev: string;
  tol: number;
  ig: number;
}

export interface IEsemeny {
  nev: string;
  datum: string;
  szervezo: string;
}

export interface IIntezmenyHelyszin {
  helyszin: string;
  nyitas: number;
  koltozes: number;
  latitude: number;
  longitude: number;
}