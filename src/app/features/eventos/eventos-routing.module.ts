import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { PageEventoComponent } from './page-evento/page-evento.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Eventos' },
    children: [
      {
        path:'',
        component: EventoComponent,
        data: { title: 'Eventos', breadcrumb:[{label:'eventos',url:'/eventos'}]}
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventosRoutingModule { }
