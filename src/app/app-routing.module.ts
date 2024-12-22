import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as RequestListComponent } from './request/list/list.component';

import { AuthGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { AfterLoginComponent } from './auth/after-login/after-login.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent, outlet: 'auth' },
	{ path: 'logout', component: LogoutComponent, outlet: 'auth' },
	{ path: 'after-login', component: AfterLoginComponent, outlet: 'auth' },

	// { canActivate: [AuthGuard], path: 'dashboard', component: DashboardComponent },
	{ canActivate: [AuthGuard], path: 'dashboard/:first', component: DashboardComponent },
	{ path: 'dashboard', component: DashboardComponent },


	{ canActivate: [AuthGuard], path: 'requests', component: RequestListComponent },
// 	{ path: 'requests', component: RequestListComponent },


];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
