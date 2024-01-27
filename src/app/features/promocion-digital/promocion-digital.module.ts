import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';

import { PromocionDigitalRoutingModule } from './promocion-digital-routing.module';
import { PromocionDigitalComponent } from './pages/promocion-digital/promocion-digital.component';

import { CreatePromocionDigitalComponent } from './components/create-promocion-digital/create-promocion-digital.component';
import { UpdatePromocionDigitalComponent } from './components/update-promocion-digital/update-promocion-digital.component';
import { FormPromocionDigitalComponent } from './components/form-promocion-digital/form-promocion-digital.component';
import { PagePromocionDigitalComponent } from './pages/page-promocion-digital/page-promocion-digital.component';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    PromocionDigitalComponent,
    CreatePromocionDigitalComponent,
    UpdatePromocionDigitalComponent,
    FormPromocionDigitalComponent,
    PagePromocionDigitalComponent
  ],
  imports: [
    CommonModule,
    PromocionDigitalRoutingModule,
    MaterialModule,
    QuillModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

})
export class PromocionDigitalModule { }
