import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UrlaubService} from "../services/urlaub.service";
import {Subscription} from "rxjs";
import {Urlaub} from "../models/urlaub";
import {UserService} from "../services/user.service";
import * as firebase from 'firebase';
import {Users} from "../models/users";

@Component({
  selector: 'app-urlaub-view',
  templateUrl: './urlaub-view.component.html',
  styleUrls: ['./urlaub-view.component.scss']
})
export class UrlaubViewComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  urlaubSubscription: Subscription;
  urlaubsantraege: Urlaub[] = [];
  userVerbunden: Users;
  email: string;
  usersList: Users[] = [];
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
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.urlaubSubscription.unsubscribe();
  }
  einreichen(id: number) {
    this.urlaubsantraege[id].eingereicht = true;
    this.urlaubService.saveUrlaub();
  }

}
