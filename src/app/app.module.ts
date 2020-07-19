import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UrlaubViewComponent } from './urlaub-view/urlaub-view.component';
import { UrlaubFormComponent } from './urlaub-view/urlaub-form/urlaub-form.component';
import { SingleUrlaubComponent } from './urlaub-view/single-urlaub/single-urlaub.component';
import { UrlaubChangeComponent } from './urlaub-view/urlaub-change/urlaub-change.component';
import { RegistrierungComponent } from './registrierung/registrierung.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { NavigationComponent } from './navigation/navigation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {UrlaubService} from "./services/urlaub.service";
import {UserService} from "./services/user.service";
import {RouterModule, Routes} from "@angular/router";
import { UrlaubControlComponent } from './urlaub-view/urlaub-control/urlaub-control.component';

const appRoutes: Routes = [
  {path: 'antrag/new', canActivate: [AuthGuardService], component: UrlaubFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrierung', component: RegistrierungComponent},
  {path: 'antrag/view', canActivate: [AuthGuardService], component: UrlaubViewComponent},
  {path: 'antrag/control', canActivate: [AuthGuardService], component: UrlaubControlComponent},
  {path: 'antrag/change/:id', canActivate: [AuthGuardService], component: UrlaubChangeComponent},
  {path: 'antrag/view/:id', canActivate: [AuthGuardService], component: SingleUrlaubComponent},
  {path: '', redirectTo: 'antrag/view', pathMatch: 'full'},
  {path: '**', redirectTo: 'antrag/view'}
]

@NgModule({
  declarations: [
    AppComponent,
    UrlaubViewComponent,
    UrlaubFormComponent,
    SingleUrlaubComponent,
    UrlaubChangeComponent,
    RegistrierungComponent,
    LoginComponent,
    MenuComponent,
    NavigationComponent,
    UrlaubControlComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    AuthGuardService,
    UrlaubService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
