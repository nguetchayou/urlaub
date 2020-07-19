import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../services/user.service";
import {Subscription} from "rxjs";
import {Users} from "../models/users";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  email: string;
  userList: Users[] = [];
  userVerbunden: Users;
  userIndex: number;
  isAuth = false;
  constructor(private userService: UserService,
              private router: Router) {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.email = user.email;
          this.isAuth = true;
        }
      }
    );
    this.router.events.subscribe(
      (val) => {
        if (this.router.url === '/login' || this.router.url === '/registrierung' ) {
          this.isAuth = false;
        } else {
          this.isAuth = true;
        }
      }
    );
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.email = user.email;
          this.isAuth = true;
        }
      }
    );
    this.userSubscription = this.userService.usersSubject.subscribe(
      (userListe) => {
        this.userList = userListe;
        this.userVerbunden = this.userService.findUserByEmail(this.email);
        this.userIndex = this.userService.findUserIndexByEmail(this.email);
      }
    );
    this.userService.getUsersList();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
