import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public success_message = '';
  public error_message = '';
  public commonError: string = '';

  constructor(
    private fb: FormBuilder,
    private httpx: HttpxService,
    private dialog: MatDialog,
    private location: Location,
    private http: HttpClient
  ) {
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const userDataString = localStorage.getItem('userData');
    let storedEmail = '';

    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        storedEmail = userData.email || '';
      } catch (error) {
        console.error('Error parsing user data from localStorage', error);
      }
    }

    // Initialize the form with the retrieved email
    this.changePasswordForm = this.fb.group({
      email: [storedEmail, [Validators.required, Validators.email]],
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]]
    });
  }
  

  onSubmit() {
    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.value;

      this.httpx.post(Global.api('artist/update-password'), data).pipe(
        catchError((error: any) => {
          console.error('Password update failed', error);
          this.error_message = error.error?.messages.common || 'Failed to update password.';
          return of(null);
        })
      ).subscribe((response: any) => {
        if (response) {
          this.success_message = 'Password updated successfully!';
          this.error_message = '';
          this.changePasswordForm.reset();
        } else {
          this.success_message = '';
        }
      });
    } else {
      this.error_message = 'Please fill out all required fields correctly.';
    }
  }

  clearMessages() {
    this.success_message = '';
    this.error_message = '';
  }
}
