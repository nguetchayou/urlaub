import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UrlaubService} from "../../services/urlaub.service";
import {Urlaub} from "../../models/urlaub";
import {Router} from "@angular/router";
import * as firebase from 'firebase';
import {UserService} from "../../services/user.service";
import {Users} from "../../models/users";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-urlaub-form',
  templateUrl: './urlaub-form.component.html',
  styleUrls: ['./urlaub-form.component.scss']
})
export class UrlaubFormComponent implements OnInit, OnDestroy {
  urlaubForm: FormGroup;
  email: string;
  userVerbunden: Users;
  usersList: Users[];
  userSubscription: Subscription;
  errorMessageBeginn: string;
  errorMessageEnde: string;
  errorMessageUrlaubstage: string;
  constructor(private formBuilder: FormBuilder,
              private urlaubService: UrlaubService,
              private router: Router,
              private usersService: UserService) {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.email = user.email;
        }
      }
    );
  }
  prueftValue() {
    this.errorMessageUrlaubstage = '';
    this.errorMessageBeginn = '';
    this.errorMessageEnde = '';
    const beginn = this.urlaubForm.get('urlaubsbeginn').value;
    const ende = this.urlaubForm.get('urlaubsende').value;
    const urlaubstage = +this.urlaubForm.get('urlaubstage').value;
    let weiter = true;
    if(beginn.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) === null) {
      this.errorMessageBeginn = 'Urlaubsbeginn: z.B. 25/08/2020';
      weiter = false;
    }
    if(ende.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/) === null) {
      this.errorMessageEnde = 'Urlaubsende: z.B. 25/08/2020';
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

  ngOnInit(): void {
    this.userSubscription = this.usersService.usersSubject.subscribe(
      (user) => {
        this.usersList = user;
        this.userVerbunden = this.usersService.findUserByEmail(this.email);
      }
    );
    this.usersService.getUsersList();
    this.initUrlaubForm();
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
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
  generateUrlaubDaten() {
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
    if (this.prueftValue()) {
      const urlaub = this.generateUrlaubDaten();
      urlaub.eingereicht = true;
      this.urlaubService.addUrlaub(urlaub);
      this.router.navigate(['/antrag', 'view']);
    }
  }
  onSaveAntrag() {
    if (this.prueftValue()) {
      const urlaub = this.generateUrlaubDaten();
      this.urlaubService.addUrlaub(urlaub);
      this.router.navigate(['/antrag', 'view']);
    }
  }
}
