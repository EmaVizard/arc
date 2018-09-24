import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: 'admin', component: AdminComponent },
	{ path: 'home', component: HomeComponent },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', redirectTo: '/home'},
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
  	RouterModule.forRoot(routes)
  ],
})
export class AppRoutingModule { }
