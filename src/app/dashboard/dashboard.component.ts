import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  // --- Data Arrays (Placeholders for UI lists) ---
  public leads: any;
  public leadFollowups: any;
  public summary: any;
  public activities: any;

  // --- UI & State Configuration ---
  public addProductUrl:string = 'product/add' ;
  public pageOptions = Global.pageOptions() ;
  
  constructor(@Inject(DOCUMENT) private document: Document, // Access to the browser DOM if needed
    private httpx: HttpxService, private activatedRoute: ActivatedRoute,
    private router: Router) { }
  // Row identifier
  public rowId: string = "";

  // Identifying properties
  public sort:any = { name : "title", order : "ASC" };
  public affiliateId:string = "" ;
  public email:string = "" ;
  public name: string = "" ;
  public search:string = "";
  public userData:any = {} ;
  public data:any = {} ;
  
  /**
   * Component Lifecycle: Executed on load.
   * Retrieves user session data and triggers initial data fetch.
   */
  ngOnInit(): void {
    // Retrieve the user object stored during login
	  let userString:string = localStorage.getItem('userData') || '{}';
    try {
   		this.userData = JSON.parse(userString) ;
      // Map the user ID to clubId to filter dashboard stats
   		this.affiliateId = this.userData.id ;
    }
    catch(e) {}
    
      this.refreshList(this.pageOptions.pageEvents) ;
  }
  // Handles paginator changes (page size or index)
  handlePageEvent(event: PageEvent) {
        this.refreshList(event) ;
  }

  /**
   * Hits the 'club-summary' API endpoint to get dashboard metrics.
   * @param event The current pagination state (index, size, etc.)
   */
  refreshList(event: PageEvent) {

		this.httpx.get(Global.api('affiliate-summary/' + this.affiliateId )).subscribe((data: any) => {
			this.data = data.data ;
		})
  }

}
