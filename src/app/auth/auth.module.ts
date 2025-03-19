import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {LoginComponent} from './login/login.component';
import {AfterLoginComponent} from './after-login/after-login.component';
import {LogoutComponent} from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [

    LoginComponent,
    AfterLoginComponent,
    LogoutComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {
}
