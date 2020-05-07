export interface IIntezmeny {
  nev: string;
  alapitas: number;
  megszunes: number;
  intezmenyId: string;
  leiras: string;
  tipus: number;
  latitude: number;
  longitude: number;
  link: string;
  intezmenyHelyszinek: IIntezmenyHelyszin[];
  intezmenyVezetok: IIntezmenyVezeto[];
  esemenyek: IEsemeny[];
}

interface IIntezmenyVezeto {
  nev: string;
  tol: number;
  ig: number;
}

interface IEsemeny {
  nev: string;
  datum: string;
  szervezo: string;
}

interface IIntezmenyHelyszin {
  helyszin: string;
  nyitas: number;
  koltozes: number;
  latitude: number;
  longitude: number;
}