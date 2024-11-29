import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ControllerComponent } from 'src/app/base/components/controller.component';

import { Global } from 'src/app/base/services/global';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent extends ControllerComponent implements OnInit {
  public editMode: boolean = false;
  public addMode: boolean = false;
  public viewMode: boolean = false;

  public activeDashboard = '';
  public activeRequests = '';
  public activePlayerTransactionHistory = '';
  public activeAffiliateTransactionHistory = '';
  public activeTransactionReport = '' ;
  public activeAffiliateRequest = '' ;
  public unreadChatCount:String = "" ;

  public hasUser = false;

  constructor(public location: Location) {
    super(location);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    let userData = localStorage.getItem('user') ;
    if( userData != null ) {
      this.hasUser = true ;
    }

    this.loadRouteFlag(this.routePath)

    let that = this ;

    setTimeout(() => {

    console.log("----- HIT -----")

    Global.chatCountNotifier = (chatCount:any) => {

    	if( chatCount.length > 0 ) {
        		that.unreadChatCount = chatCount.length ;
        		}
        		else {
that.unreadChatCount = "" ;
				}
              }
    }, 2000 ) ;

  }
  public  onSelectMenu(event:any, target:string) {
	  this.loadRouteFlag(target) ;
  }
  public loadRouteFlag(target:string) {

	  this.activeDashboard = '';
	  this.activeRequests = '';
	  this.activePlayerTransactionHistory = '';
	  this.activeAffiliateTransactionHistory = '';
	  this.activeTransactionReport = '' ;
	  this.activeAffiliateRequest = '' ;

    if (target.search(/^(dashboard)/) >= 0) {
      this.activeDashboard = 'selected';
    }
    else if (target.search(/^(players)/) >= 0) {
      this.activeRequests = 'selected';
    }
    else if (target.search(/^(player-transactions)/) >= 0) {
      this.activePlayerTransactionHistory = 'selected';
    }
    else if (target.search(/^(affiliate-transactions)/) >= 0) {
      this.activeAffiliateTransactionHistory = 'selected';
    }
    else if (target.search(/^(transaction-report)/) >= 0) {
      this.activeTransactionReport = 'selected';
    }
    else if (target.search(/^(affiliate-requests)/) >= 0) {
      this.activeAffiliateRequest = 'selected';
    }

  }

}
