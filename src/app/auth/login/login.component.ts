import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

import { HttpxService } from 'src/app/base/services/httpx.service';
import { Global } from 'src/app/base/services/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  otp: string = '';
  step: 'CREDENTIALS' | 'VERIFY_OTP' = 'CREDENTIALS';
  infoMessage: string = '';
  isSubmitting = false;

  artistId: string | null = null;

  data: any = {} ;
  hasError:boolean = false ;
  errorMessage:string = "" ;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpx: HttpxService ) {
  }

  ngOnInit(): void {
    const stored = sessionStorage.getItem('mfa_step');
    if (stored) {
      this.step = 'VERIFY_OTP'
    } else {
      this.step = 'CREDENTIALS';
    }

  }

  onSubmit() :  void {
  if (!this.email || !this.password) {
    this.hasError = true;
    this.errorMessage = 'Please enter both email and password.';
    return;
  }
  let data = {
    'email' : this.email,
    'password' : this.password
  };
  this.hasError = false ;
  let that = this ;
    this.httpx.post( Global.api('artist/login' ) , data).subscribe((response: any) => {
      this.data = response.data;

      if( response.status == "OK" ) {

        sessionStorage.setItem('mfa_step', 'VERIFY_OTP');
        sessionStorage.setItem('artistId', response.data.id);
        that.step = 'VERIFY_OTP' ;
        that.artistId = response.data.id ;
        this.infoMessage = 'OTP sent to your email. Enter it below.';

      }
    }, (response:any) => {
      if(response.error.status == "FAIL") {
		  that.hasError = true ;
		  that.errorMessage = response.error.messages.common ;
	  }
	});
  }

verifyOtp() : void {

  if (!this.otp || this.otp.trim() === '') {
    this.hasError = true;
    this.errorMessage = 'Please enter the OTP.';
    this.infoMessage = '';
    return;
  }

  if (this.otp.length < 6) {
    this.hasError = true;
    this.errorMessage = 'Please enter the full 6-digit OTP.';
    this.infoMessage = '';
    return;
  }

  const artis_id = sessionStorage.getItem('artistId');

  const payload = {
    'id': artis_id ? artis_id : this.artistId,
    'otp': this.otp,
  }

  this.httpx.post(Global.api('artist/verify-otp'), payload).subscribe({
    next: (response: any) => {
      if(response.status === 'OK') {
        this.errorMessage = '';
        this.infoMessage = '';
        sessionStorage.removeItem('mfa_step');

        Swal.fire({
        title: 'Verified!',
        text: 'OTP verified successfully. Redirecting...',
        icon: 'success',
        confirmButtonText: 'Continue',
        timer: 1500,
        showConfirmButton: false,
        willClose: () => {
        let jsonData = JSON.stringify(response.data || {}) ;
        localStorage.setItem('userData', jsonData );
        this.document.location.href = environment.APP_DASHBOARD;
      }});
      } else {
        this.hasError = true;
        this.errorMessage =  'Verification failed. Please try again.';
      }
    },
    error: (err: any) => {
        this.isSubmitting = false;
        this.hasError = true;
        if (err.error?.status === 'FAIL') {
          // backend might send otp or common message
          this.errorMessage =
            err.error.messages?.common || err.error?.otp || 'Invalid OTP.';
          this.infoMessage = '';
        } else {
          this.errorMessage = 'Verification error.';
          this.infoMessage = '';
        }
      }
  })

}

resendOtp() : void {
    const artis_id = sessionStorage.getItem('artistId');

    const payload = {
      'id': artis_id ? artis_id : this.artistId,
    }

  this.httpx.post(Global.api('artist/resend-otp'), payload).subscribe({
    next: (response: any) => {
      if(response.status === 'OK') {
        this.infoMessage = 'OTP resent to your email.';
        this.hasError = false;
      } else {
        this.hasError = true;
        this.errorMessage = 'Failed to resend OTP. Please try again.';
      }
    },
    error: (err: any) => {
        this.isSubmitting = false;
        this.hasError = true;
        if (err.error?.status === 'FAIL') {
          this.errorMessage = err.error.messages?.common || 'Resend failed.';
          this.infoMessage = '';
        } else {
          this.errorMessage = 'Resend error.';
        }
      }
  })

}

}
