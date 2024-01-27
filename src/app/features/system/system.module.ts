import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { PageSystemComponent } from './pages/page-system/page-system.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PageSystemComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    MaterialModule,
    SharedModule    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class SystemModule { }
