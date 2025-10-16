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

const routes: Routes = [

	{ path: '', redirectTo: 'login', pathMatch: 'full' },

	{ canActivate: [GuestGuard], path: 'login', component: LoginComponent, outlet: 'auth' },

	{ canActivate: [AuthGuard], path: 'logout', component: LogoutComponent, outlet: 'auth' },

	{ canActivate: [AuthGuard], path: 'dashboard', component: DashboardComponent },

	{ canActivate: [AuthGuard], path: 'requests', component: RequestListComponent },

	{ canActivate: [AuthGuard], path: 'change-password', component: ChangePasswordComponent },

	{ canActivate: [AuthGuard], path: 'last-login/:id', component: LastLoginComponent },

	{ path: '**', redirectTo: 'dashboard' } 
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
