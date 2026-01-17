import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpxService } from 'src/app/base/services/httpx.service';
import { Global } from 'src/app/base/services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  // Data Properties: Bound to the HTML form via [(ngModel)]
  email: string = '';
  password: string = '';
  data: any = {};
  // State Flags: Manage UI feedback for errors
  hasError: boolean = false;
  errorMessage: string = '';
  constructor(
    @Inject(DOCUMENT) private document: Document, // Injected for hard redirection
    private httpx: HttpxService, // Custom HTTP service for API calls
  ) {}

  ngOnInit(): void {}

  // Handles the login form submission
  onSubmit(): void {
    // Prepare Payload: Gather user input for the API request
    let data = {
      email: this.email,
      password: this.password,
    };

    // Reset error states before starting a new request
    this.hasError = false;
    let that = this;

    // Execute POST request to the artist login endpoint
    this.httpx.post(Global.api('artist/login'), data).subscribe(
      (response: any) => {
        this.data = response.data;

        // Success Logic: If the server returns "OK"
        if (response.status == 'OK') {
          // Convert user object to string for persistent local storage
          let jsonData = JSON.stringify(this.data || {});
          localStorage.setItem('userData', jsonData);
          // this.router.navigate(['dashboard/launch']);

          // Hard Redirect: Send the authenticated user to the Dashboard environment
          that.document.location.href = environment.APP_DASHBOARD;
        }
      },
      (response: any) => {
        // Error Logic: Handle failed authentication
        if (response.error.status == 'FAIL') {
          that.hasError = true;
          // Extract the specific error message provided by the backend (e.g., "Invalid Credentials")
          that.errorMessage = response.error.messages.common;
        }
      },
    );
  }
}
