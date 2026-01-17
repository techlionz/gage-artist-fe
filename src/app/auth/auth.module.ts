import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './login/login.component';
import { AfterLoginComponent } from './after-login/after-login.component';
import { LogoutComponent } from './logout/logout.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

/**
 * AuthModule handles the user authentication feature set.
 * It encapsulates login, logout, password management, and post-login redirection logic.
 */

@NgModule({
  // declarations: Register the components that belong to this module
  declarations: [
    LoginComponent,
    AfterLoginComponent,
    LogoutComponent,
    ChangePasswordComponent,
  ],
  // / imports: Add external modules required by the components in this module
  imports: [CommonModule, BrowserModule, FormsModule, ReactiveFormsModule],
})
export class AuthModule {}
