import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UrlaubService} from "../../services/urlaub.service";
import {ActivatedRoute, Router} from "@angular/router";
import * as firebase from 'firebase';
import {Users} from "../../models/users";
import {Urlaub} from "../../models/urlaub";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-urlaub-change',
  templateUrl: './urlaub-change.component.html',
  styleUrls: ['./urlaub-change.component.scss']
})
export class UrlaubChangeComponent implements OnInit, OnDestroy {
  urlaubForm: FormGroup;
  userVerbunden: Users;
  urlaubList: Urlaub[];
  urlaub:Urlaub;
  userList: Users[];
  email: string;
  userSubscription: Subscription;
  urlaubSubscription: Subscription;
  id: number;
  errorMessageBeginn: string;
  errorMessageEnde: string;
  errorMessageUrlaubstage: string;
  constructor(private formBuilder: FormBuilder,
              private urlaubService: UrlaubService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.email = user.email;
        }
      }
    );
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params.id;
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.email = user.email;
        }
      }
    );
    this.urlaubSubscription = this.urlaubService.urlaubslistSubject.subscribe(
      (urlaubListe) => {
        this.urlaubList = urlaubListe;
        this.urlaub = this.urlaubList[this.id];
      }
    );
    this.urlaubService.getUrlaubList();
    this.userSubscription = this.userService.usersSubject.subscribe(
      (userListe) => {
        this.userList = userListe;
        this.userVerbunden = this.userService.findUserByEmail(this.email);
      }
    );
    this.userService.getUsersList();
    this.initUrlaubForm();
  }
  initUrlaubForm() {
    this.urlaubForm = this.formBuilder.group(
      {
        resturlaub:['', [Validators.required, Validators.pattern(/[0-9]+/)]],
        urlaubsbeginn: ['', Validators.required],
        urlaubsende: ['', Validators.required],
        urlaubstage:['', [Validators.required, Validators.pattern(/[0-9]+/)]],
        sonderurlaub: ['', Validators.required]
      }
    );
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.urlaubSubscription.unsubscribe();
  }
  checktValue() {
    this.errorMessageUrlaubstage = '';
    this.errorMessageBeginn = '';
    this.errorMessageEnde = '';
    const beginn = this.urlaubForm.get('urlaubsbeginn').value;
    const ende = this.urlaubForm.get('urlaubsende').value;
    const urlaubstage = +this.urlaubForm.get('urlaubstage').value;
    let weiter = true;
    if(beginn.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) === null) {
      this.errorMessageBeginn = 'Urlaubsbeginn: z.B. 25/08/2020 oder 02/01/2020';
      weiter = false;
    }
    if(ende.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) === null) {
      this.errorMessageEnde = 'Urlaubsende: z.B. 25/08/2020 oder 02/01/2020';
      weiter = false;
    } else {
      if(weiter) {
        const beginnDate = new Date(parseInt(beginn.slice(6, beginn.length)), parseInt(beginn.slice(3, 5)), parseInt(beginn.slice(0, 2)));
        const endeDate = new Date(parseInt(beginn.slice(6, ende.length)), parseInt(ende.slice(3, 5)), parseInt(ende.slice(0, 2)));
        if(beginnDate > endeDate) {
          this.errorMessageEnde += this.errorMessageEnde === '' ? 'Kontrollieren Sie bitte den Zeitraum ihrer Urlaubstage!!!'
            : '\nKontrollieren Sie bitte den Zeitraum ihrer Urlaubstage!!!';
          weiter = false;
        }
      }
    }
    if(this.userVerbunden.verbleibender - urlaubstage < 0) {
      this.errorMessageUrlaubstage = 'Sie können noch ' + this.userVerbunden.verbleibender + ' Urlaubstage buchen!';
      weiter = false;
    }
    return weiter;
  }
  gUrlaubDaten() {
    const resturlaub = +this.urlaubForm.get('resturlaub').value;
    const urlaubsbeginn = this.urlaubForm.get('urlaubsbeginn').value;
    const urlaubsende = this.urlaubForm.get('urlaubsende').value;
    const urlaubstage = +this.urlaubForm.get('urlaubstage').value;
    const sonderurlaub = this.urlaubForm.get('sonderurlaub').value === 'ja';
    const urlaub = new Urlaub(this.userVerbunden.vorname + ', ' +
      this.userVerbunden.nachname, resturlaub, urlaubsbeginn,
      urlaubsende, urlaubstage, sonderurlaub);
    return urlaub;
  }

  urlaubSubmit() {
    if (this.checktValue()) {
      const urlaub = this.gUrlaubDaten();
      this.urlaubService.updateUrlaub(this.id, urlaub);
      this.router.navigate(['/antrag', 'view']);
    }
  }
  onCancelAntrag() {
    this.router.navigate(['/antrag', 'view']);
  }
  removeAntrag() {
    this.urlaubService.removeUrlaub(this.id);
    this.router.navigate(['/antrag', 'view']);
  }
}
