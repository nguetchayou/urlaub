import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initLogin();
  }
  initLogin() {
    this.loginForm = this.formBuilder.group(
      {
        email:['', [Validators.required, Validators.email]],
        passwort:['', Validators.required]
      }
    );
  }

  onSubmitLogin() {
    this.errorMessage = '';
    this.authService.signInUser(this.loginForm.get('email').value,
      this.loginForm.get('passwort').value).then(
      () => {
        this.router.navigate(['/antrag', 'view']);
      }
    ).catch(
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
