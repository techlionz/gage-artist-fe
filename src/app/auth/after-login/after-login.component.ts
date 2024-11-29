import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { Global } from 'src/app/base/services/global';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss']
})
export class AfterLoginComponent implements OnInit {

  public token: any;
  public user:any = [] ;

  constructor(@Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpx: HttpxService ) {
  }

  ngOnInit(): void {    
    debugger;
    this.token = this.activatedRoute.snapshot.queryParamMap.get("token");

    if( this.token != null && this.token.length > 0 ) {
      localStorage.setItem('token', this.token);

      this.httpx.get(Global.api(Global.API_USER )).subscribe((data: any) => {
        //Find user details.
        this.user = data.data;
        localStorage.setItem('user', JSON.stringify(this.user));
        // this.router.navigate(['dashboard/launch']);
        this.document.location.href = environment.APP_DASHBOARD;
        return ;
      });
    }
    else {
      this.document.location.href = environment.AUTH_BEGIN ;
    }
  }
}
