import { Injectable } from '@angular/core';
import {Users} from "../models/users";
import {Subject} from "rxjs";
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot;
import {Urlaub} from "../models/urlaub";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersList: Users[] = [];
  usersSubject = new Subject<Users[]>();
  constructor() {
    this.getUsersList();
  }
  emitUserSubject() {
    this.usersSubject.next(this.usersList.slice());
  }
  saveUser() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users').set(this.usersList).
        then(
          () => {
            this.emitUserSubject();
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
  addUser(user: Users) {
    this.usersList.push(user);
    this.saveUser();
  }
  getUsersList() {
    firebase.database().ref('/users').on('value', (data: DataSnapshot) => {
      this.usersList = data.val() ? data.val() : [];
      this.emitUserSubject();
    });
  }
  getSingleUsers(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/users/' + id).
        once('value').then(
          (data: DataSnapshot) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  findUserByEmail(email: string) {
    const userIndex = this.usersList.findIndex(
      user => {
        if (user.email === email) {
          return true;
        }
      }
    );
    return this.usersList[userIndex];
  }
  findUserIndexByName(name: string) {
    const userIndex = this.usersList.findIndex(
      user => {
        if (user.vorname + ', ' + user.nachname === name) {
          return true;
        }
      }
    );
    return userIndex;
  }
  findUserIndexByEmail(email: string) {
    const userIndex = this.usersList.findIndex(
      user => {
        if (user.email === email) {
          return true;
        }
      }
    );
    return userIndex;
  }
  checkRestUrlaub(urlaub: Urlaub) {
    return (urlaub.urlaubBeginn.match(/\/(01|02|03)\//) !== null
      || urlaub.urlaubsende.match(/\/(01|02|03)\//) !== null);
  }
  updateUrlaubInfo(urlaub: Urlaub, userIndex: number) {
    if(this.usersList[userIndex].verbleibender - urlaub.urlaubstageAntrag < 0) {
      const rest = this.usersList[userIndex].verbleibender - urlaub.urlaubstageAntrag;
      urlaub.urlaubstageAntrag += rest;
    }
    if(this.usersList[userIndex].beantragterUrlaub === undefined) {
      this.usersList[userIndex].beantragterUrlaub = 0;
    }
    if(urlaub.sonderurlaub) {
      // wie ist es für sonderurlaub, sollen sie begrenzt
      this.usersList[userIndex].beantragterUrlaub += urlaub.urlaubstageAntrag;
    } else if(this.checkRestUrlaub(urlaub)) {
      this.usersList[userIndex].beantragterUrlaub += urlaub.urlaubstageAntrag + urlaub.resturlaubstage;
      this.usersList[userIndex].verbleibender -= urlaub.urlaubstageAntrag;
    } else {
      this.usersList[userIndex].beantragterUrlaub += urlaub.urlaubstageAntrag;
      this.usersList[userIndex].verbleibender -= urlaub.urlaubstageAntrag;
    }
    this.saveUser();
  }
}
