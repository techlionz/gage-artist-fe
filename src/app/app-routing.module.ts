import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as RequestListComponent } from './request/list/list.component';
import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { GuestGuard } from './auth/service/auth/guest.guard';
import { LastLoginComponent } from './pages/last-login/last-login.component';

/**
 * Route Configuration
 * canActivate: Uses Guards to prevent unauthorized access.
 * outlet: Used for named router outlets (secondary views).
 */

const routes: Routes = [

	// Default route: Redirects empty path to the login page
	{ path: '', redirectTo: 'login', pathMatch: 'full' },

	/**
     * Auth Routes
     * 'GuestGuard' ensures logged-in users cannot go back to the login page.
     * 'outlet: auth' indicates these load into <router-outlet name="auth"></router-outlet>
     */

	{ canActivate: [GuestGuard], path: 'login', component: LoginComponent, outlet: 'auth' },

	/**
     * Protected Routes
     * 'AuthGuard' ensures only logged-in users can access these pages.
     */

	{ canActivate: [AuthGuard], path: 'logout', component: LogoutComponent, outlet: 'auth' },

	{ canActivate: [AuthGuard], path: 'dashboard', component: DashboardComponent },

	{ canActivate: [AuthGuard], path: 'requests', component: RequestListComponent },

	{ canActivate: [AuthGuard], path: 'change-password', component: ChangePasswordComponent },

	{ canActivate: [AuthGuard], path: 'last-login/:id/:nickname', component: LastLoginComponent },

	/**
     * Wildcard Route: Catch-all for any URL that doesn't match the above.
     * Usually redirects to dashboard 
     */

	{ path: '**', redirectTo: 'dashboard' } 
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
