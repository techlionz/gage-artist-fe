import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

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
  data: any = {} ;
  hasError:boolean = false ;
  errorMessage:string = "" ;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpx: HttpxService ) {
  }

  ngOnInit(): void {
  }

  onSubmit() :  void {
  let data = {
  'email' : this.email,
  'password' : this.password
  };
  this.hasError = false ;
  let that = this ;
    this.httpx.post( Global.api('affiliate/login' ) , data).subscribe((response: any) => {
      this.data = response.data;
      console.log("Failed reponse") ;

      if( response.status == "OK" ) {
		let jsonData = JSON.stringify(this.data || {}) ;
        localStorage.setItem('userData', jsonData );
        // this.router.navigate(['dashboard/launch']);
        that.document.location.href = environment.APP_DASHBOARD;
      }
    }, (response:any) => {
      if(response.error.status == "FAIL") {
		  that.hasError = true ;
		  that.errorMessage = response.error.messages.common ;
	  }
	});
  }

}
