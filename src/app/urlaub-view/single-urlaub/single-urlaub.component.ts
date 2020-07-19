import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Users} from "../../models/users";
import {UserService} from "../../services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-single-urlaub',
  templateUrl: './single-urlaub.component.html',
  styleUrls: ['./single-urlaub.component.scss']
})
export class SingleUrlaubComponent implements OnInit {
  id: number;
  userList: Users[] = [];
  userSubscription: Subscription;
  userVerbunden: Users;
  constructor(private route: ActivatedRoute,
              private userService: UserService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id;
    this.userSubscription = this.userService.usersSubject.subscribe(
      (userListe) => {
        this.userList = userListe;
        this.userVerbunden = this.userList[this.id];
        console.log(this.userVerbunden.beantragterUrlaub);
      }
    );
    this.userService.getUsersList();
  }

}
