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
  // --- UI Flags ---
  public editMode: boolean = false;
  public addMode: boolean = false;
  public viewMode: boolean = false;

  // --- Navigation Active States ---
    // These strings are set to 'selected' to apply CSS classes in the HTML template
  public activeDashboard = '';
  public activeRequests = '';
  public activePlayerTransactionHistory = '';
  public activeAffiliateTransactionHistory = '';
  public activeTransactionReport = '' ;
  public activeAffiliateRequest = '' ;

  // --- State Variables ---
  public unreadChatCount:String = "" ;
  public hasUser = false;

  constructor(public location: Location) {
    // Inherits location handling from ControllerComponent
    super(location);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    // Check Local Storage for user session data to toggle login-dependent UI
    let userData = localStorage.getItem('user') ;
    if( userData != null ) {
      this.hasUser = true ;
    }

    // Initialize the active menu item based on the current URL path
    this.loadRouteFlag(this.routePath)

    let that = this ;

    /**
         * Real-time Chat Notification Setup
         * Uses a custom global notifier pattern to update the unread count.
         * Wrapped in a timeout to ensure Global services are fully initialized.
         */
    setTimeout(() => {

    console.log("----- HIT -----")

    Global.chatCountNotifier = (chatCount:any) => {

      // Update unread count if the incoming data contains items
    	if( chatCount.length > 0 ) {
        		that.unreadChatCount = chatCount.length ;
        		}
        		else {
that.unreadChatCount = "" ;
				}
              }
    }, 2000 ) ;

  }

  /**
     * Triggered when a menu item is clicked to update UI highlighting.
     */
  public  onSelectMenu(event:any, target:string) {
	  this.loadRouteFlag(target) ;
  }

  /**
     * Logic to determine which menu item should be highlighted.
     * Uses Regex to match the start of the route string.
     * @param target The route path string to evaluate
     */
  public loadRouteFlag(target:string) {

	  this.activeDashboard = '';
	  this.activeRequests = '';
	  this.activePlayerTransactionHistory = '';
	  this.activeAffiliateTransactionHistory = '';
	  this.activeTransactionReport = '' ;
	  this.activeAffiliateRequest = '' ;

    // Match the target string and set the 'selected' flag for the corresponding item
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
