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
    // Initial form setup with base validation rules
    this.changePasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Lifecycle hook: Initialize the form with actual user data upon component load
    this.initForm();
  }

  initForm() {
    // Retrieve stored user session data to auto-populate the email field
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

    //  Re-initialize the form with the retrieved email to improve user experience
    this.changePasswordForm = this.fb.group({
      email: [storedEmail, [Validators.required, Validators.email]],
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required]]
    });
  }
  

  onSubmit() {
    // Check if the form meets all validation requirements 
    if (this.changePasswordForm.valid) {
      const data = this.changePasswordForm.value;

      // Execute POST request to the artist security endpoint
      this.httpx.post(Global.api('artist/update-password'), data).pipe(
        // Error Handling: Capture server-side errors (e.g., incorrect current password)
        catchError((error: any) => {
          console.error('Password update failed', error);
          // Extract specific error message from the backend response or use a default
          this.error_message = error.error?.messages.common || 'Failed to update password.';
          return of(null); // Prevent the app from crashing on error
        })
      ).subscribe((response: any) => {
        // Success Logic: If backend accepts the change, notify user and clear the form
        if (response) {
          this.success_message = 'Password updated successfully!';
          this.error_message = '';
          this.changePasswordForm.reset();
        } else {
          this.success_message = '';
        }
      });
    } else {
      // Client-side Validation Fallback: Alert user if fields are missing or invalid
      this.error_message = 'Please fill out all required fields correctly.';
    }
  }
  // Helper method to reset UI notification states
  clearMessages() {
    this.success_message = '';
    this.error_message = '';
  }
}
