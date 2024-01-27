import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  { path: '', redirectTo:'/dashboard', pathMatch: 'full' },
  {
    path:'',
    children:[
      { path: '', redirectTo:'/dashboard', pathMatch: 'full' },
      { 
        path: '', component: DashboardPageComponent,
        data: {title: 'Dashboard', breadcrumb: [{label: 'Dashboard',url: '/dashboard'}]},
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
