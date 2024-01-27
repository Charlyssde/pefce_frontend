import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProyectosPipelineComponent } from './pages/proyectos-pipeline/proyectos-pipeline.component';
import { ProyectosPanelComponent } from './pages/proyectos-panel/proyectos-panel.component';
import { ProyectosPageComponent } from './pages/proyectos-page/proyectos-page.component';
import { ProyectosCreateComponent } from './pages/proyectos-create/proyectos-create.component';
import { ProyectosUpdateComponent } from './pages/proyectos-update/proyectos-update.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Proyectos' },
    children: [
      {
        path: '',
        component: ProyectosPageComponent,
        data: {title:'Proyectos', breadcrumb:[{label:'',url:'/proyectos'}]}
      },
      { 
        path: 'nuevo', 
        component: ProyectosCreateComponent ,
        data: {title:'Proyectos', breadcrumb:[{label:'',url:'/proyectos'},{label:'nuevo',url:''}]}
      },
      { 
        path: ':idProyecto/editar', 
        component: ProyectosUpdateComponent ,
        data: {title:'Proyectos', breadcrumb:[{label:'',url:'/proyectos'},{label:'{{idProyecto}}',url:''},{label:'editar',url:''}]}
      },
      { 
        path: ':idProyecto/panel', 
        component: ProyectosPanelComponent,
        data: {title:'Proyectos', breadcrumb:[{label:'',url:'/proyectos'},{label:'{{idProyecto}}',url:''},{label:'panel',url:''}]}
       },
      { 
        path: 'pipeline', 
        component: ProyectosPipelineComponent 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
