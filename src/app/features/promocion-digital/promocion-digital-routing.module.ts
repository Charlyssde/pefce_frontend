import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PromocionDigitalComponent } from './pages/promocion-digital/promocion-digital.component';

import { CreatePromocionDigitalComponent } from 'src/app/features/promocion-digital/components/create-promocion-digital/create-promocion-digital.component';
import { FormPromocionDigitalComponent } from 'src/app/features/promocion-digital/components/form-promocion-digital/form-promocion-digital.component';
import { PagePromocionDigitalComponent } from 'src/app/features/promocion-digital/pages/page-promocion-digital/page-promocion-digital.component';
import { UpdatePromocionDigitalComponent } from 'src/app/features/promocion-digital/components/update-promocion-digital/update-promocion-digital.component';

const routes: Routes = [
  {
    path: '',
    data: { title: 'Promoción Digital' },
    children: [
      {
        path:'',
        component: PromocionDigitalComponent,
        data: { 
          title: 'Promoción digital', 
          expectedRol: '/promocionDigital',
          breadcrumb:[
            {
              label:'promociondigital',
              url:'/promocionDigital'
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
export class PromocionDigitalRoutingModule { }
