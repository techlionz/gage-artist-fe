import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthyService } from '../authy.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthyService, private router: Router,  @Inject(DOCUMENT) private document: Document,) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      // this.router.navigate(['/dashboard']);
      this.document.location.href = environment.APP_DASHBOARD; 
      return false;
    }
    return true;
  }
}
