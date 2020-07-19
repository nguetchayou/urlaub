import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {Urlaub} from "../../models/urlaub";
import {Users} from "../../models/users";
import {Router} from "@angular/router";
import {UrlaubService} from "../../services/urlaub.service";
import {UserService} from "../../services/user.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-urlaub-control',
  templateUrl: './urlaub-control.component.html',
  styleUrls: ['./urlaub-control.component.scss']
})
export class UrlaubControlComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  urlaubSubscription: Subscription;
  urlaubsantraege: Urlaub[] = [];
  userVerbunden: Users;
  email: string;
  usersList: Users[] = [];
  userIndex: number;
  constructor(private router: Router,
              private urlaubService: UrlaubService,
              private userService: UserService) {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.email = user.email;
        }
      }
    );
  }

  ngOnInit(): void {
    this.urlaubSubscription = this.urlaubService.urlaubslistSubject.subscribe(
      (urlaubListe) => {
        this.urlaubsantraege = urlaubListe;

      }
    );
    this.urlaubService.getUrlaubList();
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.email = user.email;
        }
      }
    );
    this.userSubscription = this.userService.usersSubject.subscribe(
      (userList) => {
        this.usersList = userList;
        this.userVerbunden = this.userService.findUserByEmail(this.email);
      }
    );
    this.userService.getUsersList();
  }
  findUserIndex(id: number) {
    return this.userService.findUserIndexByName(this.urlaubsantraege[id].name);
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.urlaubSubscription.unsubscribe();
  }
  genehmigt(id: number) {
    this.userService.updateUrlaubInfo(this.urlaubsantraege[id], this.findUserIndex(id));
    this.urlaubsantraege[id].genehmigt = true;
    this.urlaubService.saveUrlaub();
  }
  ablehnen(id: number) {
    this.urlaubsantraege[id].genehmigt = false; //unnoetigt
    this.urlaubsantraege[id].eingereicht = false;
    this.urlaubService.saveUrlaub();
  }
}
