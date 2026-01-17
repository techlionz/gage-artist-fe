import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Mock user for initial state or fallback
  public user:any = {"name" : 'Nithin', 'email' : 'n@g.com'} ;
  public userLetter: string = "" ;

  // UI state flags and display variables
  public hasUser = false ;
  public affiliateName: string = "Affiliate" ;
  public affiliateEmail: string = "-" ;
  public affiliateId: string = "" ;
  public userData:any = {} ;
  public t:String = "hi" ;
  constructor(
			private httpx: HttpxService) { }

      /**
   * Lifecycle hook that runs when the component initializes.
   * Used here to retrieve user session data from the browser storage.
   */

  ngOnInit(): void {
    // Retrieve the stringified user object from localStorage
    let userString:string = localStorage.getItem('userData') || "" ;

    // Logic Check: If userString is an empty string from the || operator, 
    // the previous logic might still mark hasUser as true.
    if( userString != null ) {
      this.hasUser = true ;
    }
    else {
      // Fallback to empty JSON string to prevent JSON.parse from failing
      userString = "{}" ;
	}

console.log("--========= inTERVAL ==========")
    try {
      // Parse the string into a JSON object and assign to local variables for the template
   		this.userData = JSON.parse(userString) ;
   		this.affiliateId = this.userData.id ;
   		this.affiliateName = this.userData.name ;
   		this.affiliateEmail = this.userData.email;
    }
    // Catching errors in case 'userData' in localStorage is not valid JSON
    catch(e) {}

  }




}
