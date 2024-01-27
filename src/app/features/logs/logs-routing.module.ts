import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SessionsComponent } from './pages/sessions/sessions.component';

const routes: Routes = [
  {
    path:'',
    data:{title:'Logs'},
    children:[
      {
        path:'sesiones',
        component:SessionsComponent,
        data:{title:'Sesiones',breadcrumb:[{label:'Logs',url:''},{label:'Sesiones',url:''}]}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogsRoutingModule { }
