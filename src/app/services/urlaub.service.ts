import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Urlaub} from "../models/urlaub";
import * as firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class UrlaubService {
  urlaubsantraege: Urlaub[] = [];
  urlaubslistSubject = new Subject<Urlaub[]>();
  constructor() {
    this.getUrlaubList();
  }
  emitUrlaubSubject() {
    this.urlaubslistSubject.next(this.urlaubsantraege)
  }
  getUrlaubList() {
    firebase.database().ref('/urlaubantraege')
      .on('value', (data: DataSnapshot) => {
        this.urlaubsantraege = data.val() ? data.val() : [];
        this.emitUrlaubSubject();
    });
  }
  addUrlaub(urlaub: Urlaub) {
    const index = this.urlaubsantraege.findIndex(
      (urla) => {
        if(urla ==  urlaub ) {
          return true;
        }
      }
    );
    console.log(index);
    if(index == -1) {
      this.urlaubsantraege.push(urlaub);
      this.saveUrlaub();
    }
  }
  removeUrlaub(urlaubIndex: number) {
    this.urlaubsantraege.splice(urlaubIndex, 1);
    this.saveUrlaub();
  }
  updateUrlaub(urlaubIndex: number, urlaub: Urlaub) {
    this.urlaubsantraege.splice(urlaubIndex, 1, urlaub);
    this.saveUrlaub();
  }
  saveUrlaub() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/urlaubantraege').set(this.urlaubsantraege).
        then(
          () => {
            this.emitUrlaubSubject();
            resolve(true);
          }
        )
          .catch(
            (error) => {
              reject(error);
            }
          )
      }
    );
  }

}
