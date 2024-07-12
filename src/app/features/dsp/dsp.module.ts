import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DspComponent } from './dsp.component';
import { DspRoutingModule } from './dsp-routing.module';
import { DspNuevoComponent } from './dsp-nuevo/dsp-nuevo.component';
import { DspEditComponent } from './dsp-edit/dsp-edit.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProyectosRoutingModule } from '../proyectos/proyectos-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [DspComponent, DspNuevoComponent, DspEditComponent],
  imports: [
    CommonModule,
    DspRoutingModule,
    MaterialModule,
    DragDropModule,
    SharedModule,
    QuillModule
  ]
})
export class DspModule { }
