import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { Global } from 'src/app/base/services/global';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-after-login',
  templateUrl: './after-login.component.html',
  styleUrls: ['./after-login.component.scss'],
})
export class AfterLoginComponent implements OnInit {
  public token: any;
  public user: any = [];

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private httpx: HttpxService,
  ) {}

  ngOnInit(): void {
    // Extract the 'token' from the URL query parameters
    this.token = this.activatedRoute.snapshot.queryParamMap.get('token');

    // Check if the token is valid and present
    if (this.token != null && this.token.length > 0) {
      // Store the token for global API authentication
      localStorage.setItem('token', this.token);

      // Fetch the full User Object using the new token
      this.httpx.get(Global.api(Global.API_USER)).subscribe((data: any) => {
        // Cache the User details locally for UI display (Name, Email, etc.)
        this.user = data.data;
        localStorage.setItem('user', JSON.stringify(this.user));
        // Successful session setup: Send user to the secure Dashboard
        this.document.location.href = environment.APP_DASHBOARD;
        return;
      });
    } else {
      // Security Fallback: If no token exists, send user back to the very start of Login
      this.document.location.href = environment.AUTH_BEGIN;
    }
  }
}
