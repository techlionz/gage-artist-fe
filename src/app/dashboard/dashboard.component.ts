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

  public leads: any;
  public leadFollowups: any;
  public summary: any;
  public activities: any;
  public addProductUrl:string = 'product/add' ;
  public pageOptions = Global.pageOptions() ;
  
  constructor(@Inject(DOCUMENT) private document: Document,
    private httpx: HttpxService, private activatedRoute: ActivatedRoute,
    private router: Router) { }
  // Row identifier
  public rowId: string = "";

  public sort:any = { name : "title", order : "ASC" };
  public affiliateId:string = "" ;
  public email:string = "" ;
  public name: string = "" ;
  public search:string = "";
  public userData:any = {} ;
  public data:any = {} ;
  
  ngOnInit(): void {
	  let userString:string = localStorage.getItem('userData') || '{}';
    try {
   		this.userData = JSON.parse(userString) ;
   		this.affiliateId = this.userData.id ;
    }
    catch(e) {}
    
      this.refreshList(this.pageOptions.pageEvents) ;
  }
  handlePageEvent(event: PageEvent) {
        this.refreshList(event) ;
  }
  refreshList(event: PageEvent) {

		this.httpx.get(Global.api('affiliate-summary/' + this.affiliateId )).subscribe((data: any) => {
			this.data = data.data ;
		})
  }

}
