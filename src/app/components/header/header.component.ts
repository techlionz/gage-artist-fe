import { Component, OnInit } from '@angular/core';

import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user:any = {"name" : 'Nithin', 'email' : 'n@g.com'} ;
  public userLetter: string = "" ;

  public hasUser = false ;
  public affiliateName: string = "Affiliate" ;
  public affiliateEmail: string = "-" ;
  public affiliateId: string = "" ;
  public userData:any = {} ;
  public t:String = "hi" ;
  constructor(
			private httpx: HttpxService) { }

  ngOnInit(): void {
    let userString:string = localStorage.getItem('userData') || "" ;

    if( userString != null ) {
      this.hasUser = true ;
    }
    else {

      userString = "{}" ;
	}

console.log("--========= inTERVAL ==========")
    try {
   		this.userData = JSON.parse(userString) ;
   		this.affiliateId = this.userData.id ;
   		this.affiliateName = this.userData.name ;
   		this.affiliateEmail = this.userData.email;
    }
    catch(e) {}

  }




}
