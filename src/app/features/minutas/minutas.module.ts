import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';

import { MinutasRoutingModule } from './minutas-routing.module';
import { MinutaComponent } from './pages/minuta/minuta.component';
import { PageMinutaComponent } from './pages/page-minuta/page-minuta.component';
import { CreateMinutaComponent } from './components/create-minuta/create-minuta.component';
import { FormMinutaComponent } from './components/form-minuta/form-minuta.component';
import { UpdateMinutaComponent } from './components/update-minuta/update-minuta.component';
import { QuillModule } from 'ngx-quill';
import { ModalAgregarTareaMinutaComponent } from './Modals/modal-agregar-tarea-minuta/modal-agregar-tarea-minuta.component';
import { ModalOpcionesTareasMinutaComponent } from './Modals/modal-opciones-tareas-minuta/modal-opciones-tareas-minuta.component';

@NgModule({
  declarations: [    
    MinutaComponent,
    PageMinutaComponent,
    CreateMinutaComponent,
    FormMinutaComponent,
    UpdateMinutaComponent,
    ModalAgregarTareaMinutaComponent,
    ModalOpcionesTareasMinutaComponent,  
  ],
  imports: [
    CommonModule,
    MaterialModule,
    QuillModule,
    MinutasRoutingModule,    
  ],
  entryComponents:[
    ModalAgregarTareaMinutaComponent,
    ModalOpcionesTareasMinutaComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MinutasModule { }
