import {Urlaub} from "./urlaub";

export class Users {
  verbleibender: number;
  anzahlUrlaubstage: number;
  beantragterUrlaub: number;
  constructor(public nachname: string, public vorname: string,
              public email: string, public status: string) {
    this.anzahlUrlaubstage = 30;
    this.verbleibender = 30;
    this.beantragterUrlaub = 0;
  }
}
