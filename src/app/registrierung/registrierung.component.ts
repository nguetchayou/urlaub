import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Users} from "../models/users";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.component.html',
  styleUrls: ['./registrierung.component.scss']
})
export class RegistrierungComponent implements OnInit {
  registrierungForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private usersService: UserService) { }

  ngOnInit(): void {
    this.initFormRegistrierung();
  }
  initFormRegistrierung() {
    this.registrierungForm = this.formBuilder.group(
      {nachname:['', Validators.required],
      vorname:['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      status:['', Validators.required],
      passwort:['', Validators.required],
      passwort2:['', Validators.required]}
    );
  }
  checkPasswort() {
    const pass1 = this.registrierungForm.get('passwort').value;
    const pass2 = this.registrierungForm.get('passwort2').value;
    this.errorMessage = '';
    if(pass1 === pass2) {
      this.onSubmitRegistrierung();
    } else {
      this.errorMessage = 'Das Passwort stimmt nicht überein!'
    }
  }
  onSubmitRegistrierung() {
    const user = new Users(this.registrierungForm.get('nachname').value,
      this.registrierungForm.get('vorname').value,
      this.registrierungForm.get('email').value,
      this.registrierungForm.get('status').value);
    this.errorMessage = '';
    this.authService.createNewUser(user.email, this.registrierungForm.get('passwort').value).then(
      () => {
        this.usersService.addUser(user);
        this.router.navigate(['/antrag', 'view']);
      }
    )
      .catch(
        (error) => {
          this.errorMessage = error;
        }
      );
  }
  registrieren() {}

}
