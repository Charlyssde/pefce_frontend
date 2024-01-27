import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantillaComponent } from './plantilla/plantilla.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Plantillas' },
    children: [
      {
        path:'',
        component: PlantillaComponent,
        data: 
        { 
          title: 'Plantillas', 
          breadcrumb:[
            {
              label:'plantillas',
              url:'/plantillas'
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
export class PlantillasRoutingModule { }
