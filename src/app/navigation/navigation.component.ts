import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAuth: boolean;
  constructor(private authService: AuthService) {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = !!user;
        }
      }
    );
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = !!user;
        }
      }
    );
  }
  abmelden() {
    this.authService.signOutUser();
    this.isAuth = false;
  }
}
