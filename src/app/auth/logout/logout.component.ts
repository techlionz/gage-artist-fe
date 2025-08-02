import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/base/services/global';
import { HttpxService } from 'src/app/base/services/httpx.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

	constructor(@Inject(DOCUMENT) private document: Document, private router: Router,
		private httpx: HttpxService) {

		//Company

		localStorage.removeItem('userData');
		sessionStorage.removeItem('mfa_step');
		sessionStorage.removeItem('artistId');

		console.log("Logout" + environment.APP_WELCOME);
		// this.router.navigate(['welcome']);
		this.document.location.href = environment.APP_WELCOME;

	}

	ngOnInit(): void {
		// this.document.location.href = environment.AUTH_BEGIN ;
	}
}
