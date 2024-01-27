import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinutaComponent } from './pages/minuta/minuta.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Minutas' },
    children: [
      {
        path:'',
        component: MinutaComponent,
        data: { 
          title: 'Minutas', 
          breadcrumb:[
            {
              label:'Minutas',
              url:'/Minutas'
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
export class MinutasRoutingModule { }
