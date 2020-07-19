export class Urlaub {
  urlaubstageAktJah: number;
  verbleibenderUrlaubstage: number;
  beantragterUrlabstage: number;
  eingereicht: boolean;
  genehmigt: boolean;
  constructor(public name: string, public resturlaubstage: number,
              public urlaubBeginn: string,
              public urlaubsende: string, public urlaubstageAntrag: number,
              public sonderurlaub: boolean) {
    this.urlaubstageAktJah = 30;
    this.verbleibenderUrlaubstage = 30;
    this.beantragterUrlabstage = 0;
    this.eingereicht = false;
    this.genehmigt = false;
  }
}
