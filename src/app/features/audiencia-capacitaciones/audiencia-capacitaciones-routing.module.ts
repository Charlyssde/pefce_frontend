import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudienciaCapacitacionesComponent } from './audiencia-capacitaciones/audiencia-capacitaciones.component';
import { AulaComponent } from './aula/aula/aula.component';
import { CuestionarioComponent } from './cuestionario/cuestionario/cuestionario.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Audiencia capacitaciones' },
    children: [
      {
        path:'',
        component: AudienciaCapacitacionesComponent,
        data: 
        { 
          title: 'Audiencia Capacitaciones', 
          breadcrumb:[
            {
              label:'Audiciencia Capacitaciones',
              url:'/audienciaCapacitaciones'
            }
          ]
        }
      },
      { 
        path: 'aula/:id_capacitacion', 
        component: AulaComponent, 
        data: { 
          title: 'Aula', 
          breadcrumb:[
            {
              label:'Aula',
              url:'/audienciaCapacitaciones'
            },
            {
              label:'{{capacitacionId}}',
              url:''
            },
            {
              label:'aula',
              url:'/audienciaCapacitaciones/aula/:id_capacitacion'
            }
          ]
        }
      },
      { 
        path: 'aula/:id_capacitacion/cuestionario/:id_tema', 
        component: CuestionarioComponent, 
        data: { 
          title: 'Cuestionario', 
          breadcrumb:[
            {
              label:'cuestionario',
              url:'/audienciaCapacitaciones'
            },
            {
              label:'{{capacitacionId}}',
              url:''
            },
            {
              label:'cuestionario',
              url:'audienciaCapacitaciones/aula/:id_capacitacion/cuestionario/:id_tema'
            }
          ]
        }
      } 
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudienciaCapacitacionesRoutingModule { }
