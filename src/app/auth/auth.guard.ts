import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthyService } from './service/authy.service';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';

/**
 * AuthGuard prevents unauthenticated users from accessing protected routes.
 * If the user is not logged in, they are redirected to a welcome or login page.
 */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthyService, private router: Router, @Inject(DOCUMENT) private document: Document,) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      // Check the AuthyService to see if a valid token/user exists in storage
      if (!this.authService.isLoggedIn()) {
        
        // Redirect the user to an 'login' page defined in the environment configuration.
        this.document.location.href = environment.APP_WELCOME;
        // Return false to stop the Angular router from navigating to the requested page
        return false;
      }
      // If logged in, return true to allow the navigation to proceed
    return true;
  }

}
