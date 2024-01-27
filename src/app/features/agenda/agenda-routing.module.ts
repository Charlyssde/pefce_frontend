import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendaPageComponent } from './pages/agenda-page/agenda-page.component';

const routes: Routes = [
  {
    path:'',
    data:{ title: 'Empresas'},
    children:[
      {
        path:'',
        component: AgendaPageComponent,
        data:{ title: 'Agenda', breadcrumb:[{label:'agenda',url:''}] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }
