import { Inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthyService } from '../authy.service';
import { environment } from 'src/environments/environment';
import { DOCUMENT } from '@angular/common';

/**
 * GuestGuard ensures that only unauthenticated users (guests) can access specific routes.
 * If a user is already logged in, they are redirected away from the page (e.g., Login).
 */

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(
    private authService: AuthyService,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  canActivate(): boolean {
    // Check if the user has an active session
    if (this.authService.isLoggedIn()) {
      // this.router.navigate(['/dashboard']);
      /* Instead of using the standard Angular Router (SPA navigation), 
         this performs a full page reload/redirect to an external or absolute URL 
         defined in the environment file. This is often used when moving 
         between different subdomains or separate applications.
      */
      this.document.location.href = environment.APP_DASHBOARD;

      // Prevent the requested route from loading
      return false;
    }
    // Allow access if the user is not logged in
    return true;
  }
}
