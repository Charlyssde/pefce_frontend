import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplorerEnterprisesPageComponent } from './pages/explorer-enterprises-page/explorer-enterprises-page.component';
import { ExplorerEnterprisesStandComponent } from './pages/explorer-enterprises-stand/explorer-enterprises-stand.component';
import { ExplorerHomePageComponent } from './pages/explorer-home-page/explorer-home-page.component';
import { ExploradorEventosComponent } from './pages/explorador-eventos/explorador-eventos.component';

const routes: Routes = [
  {
    path: '',
    data: {title: 'Explorador'},
    children: [
      {
        path:'',
        component: ExplorerHomePageComponent,
        data: { title: 'Inicio', breadcrumb:[{label:'exploradores',url:'/exploradores'}]}
      },
      {
        path:'empresas',
        component: ExplorerEnterprisesPageComponent,
        data: { title: 'Empresas', breadcrumb:[{label:'exploradores',url:'/exploradores'},{label:'empresas',url:''}]}
      },
      {
        path:'empresas/:empresaId/stand',
        component: ExplorerEnterprisesStandComponent,
        data: { title: 'Empresas', breadcrumb:[{label:'exploradores',url:'/exploradores'},{label:'empresas',url:''}]}
      },
      {
        path:'capacitaciones',
        component: ExplorerEnterprisesPageComponent,
        data: { title: 'Capacitaciones', breadcrumb:[{label:'exploradores',url:'/exploradores'},{label:'capacitaciones',url:''}]}
      },
      {
        path:'eventos',
        component: ExploradorEventosComponent,
        data: { title: 'Eventos', breadcrumb:[{label:'eventos',url:'/exploradores/eventos'},{label:'capacitaciones',url:''}]}
      }      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorersRoutingModule { }
