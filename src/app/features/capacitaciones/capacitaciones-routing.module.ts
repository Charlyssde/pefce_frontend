import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModuloComponent } from './modulos/modulo/modulo.component';
import { PreguntaComponent } from './preguntas/pages/pregunta/pregunta.component';
import { TemaComponent } from './temas/tema/tema.component';
import { CapacitacionComponent } from './components/capacitacion/capacitacion.component';
const routes: Routes = [
  {
    path: '',
    data: { title: 'Capacitaciones' },
    children: [
      { 
        path: '', 
        component: CapacitacionComponent, 
        data: { 
          title: 'Capacitaciones', 
          breadcrumb:[
            {
              label:'capacitaciones',
              url:'capacitaciones'
            }
          ]
        }
      },
      { 
        path: ':id_capacitacion/modulos', 
        component: ModuloComponent, 
        data: { 
          title: 'Módulos', 
          breadcrumb:[
            {
              label:'capacitaciones',
              url:'/capacitaciones'
            },
            {
              label:'{{capacitacionId}}',
              url:''
            },
            {
              label:'modulos',
              url:'/capacitaciones/:id_capacitacion/modulos'
            }
          ]
        }
      },
      { 
        path: ':id_capacitacion/modulos/:id_modulo/temas', 
        component: TemaComponent, 
        data: { 
          title: 'Temas', 
          breadcrumb:[
            {
              label:'capacitaciones',
              url:'/capacitaciones'
            },
            {
              label:'{{capacitacionId}}',
              url:''
            },
            {
              label:'temas',
              url:'/capacitaciones/:id_capacitacion/modulos/:id_modulo/temas'
            }
          ]
        }
      },      
      { 
        path: ':id_capacitacion/modulos/:id_modulo/temas/:id_tema/preguntas', 
        component: PreguntaComponent, 
        data: { 
          title: 'Preguntas', 
          breadcrumb:[
            {
              label:'capacitaciones',
              url:'/capacitaciones'
            },
            {
              label:'{{capacitacionId}}',
              url:''
            },
            {
              label:'preguntas',
              url:'/capacitaciones/:id_capacitacion/modulos/:id_modulo/temas/:id_tema/preguntas'
            }
          ]
        }
      },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacitacionesRoutingModule { }
