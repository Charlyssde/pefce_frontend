import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministracionEncuestasCreateComponent } from 'src/app/features/administracion-encuestas/components/administracionencuestas-create/administracionencuestas-create.component'
import { AdministracionEncuestasPageComponent } from './pages/administracionencuestas-page/administracionencuestas-page.component';
import {ResponderEncuestaComponent} from './pages/responder-encuestas/responder-encuesta';
const routes: Routes = [
  {
    path: '',
    data: { title: 'Administración de encuestas de satisfacción' },
    children: [
      {
        path:'',
        component: AdministracionEncuestasPageComponent,
        data: { title: 'Administración de encuestas de satisfacción',
          breadcrumb:[
            {
              label:'Administración de encuestas de satisfacción',
              url:'/admEncuestas'
            }
        ]
        }
      },
      {
        path:'nuevo',
        component: AdministracionEncuestasCreateComponent,
        data: {
          title: 'Nueva encuesta de satisfacción',
          breadcrumb:[
            {
              label:'Nueva encuesta de satisfacción',
              url:'/admEncuestas/nuevo'
            }
          ]
        }
      },
      {
        path:':encuestaId/editar',
        component: AdministracionEncuestasCreateComponent,
        data: {
          title: 'Edición de encuestas de satisfacción',
          breadcrumb:[
            {
              label:'Edición de encuestas de satisfacción',
              url:'/admEncuestas/:encuestaId/editar'
            }

          ]
        }
      },
      {
        path:'responder',
        component: ResponderEncuestaComponent,
        data: {
          title: 'Ver encuestas de satisfacción',
          breadcrumb:[
            {
              label:'Ver encuestas de satisfacción',
              url:'/admEncuestas/responder'
            }
          ]
        }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionEncuestasRoutingModule { }
