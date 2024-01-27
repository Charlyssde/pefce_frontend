import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingsAdministradorPageComponent } from './pages/meetings-administrador-page/meetings-administrador-page.component';
import { MeetingsAdministradorCreateComponent } from './pages/meetings-administrador-create/meetings-administrador-create.component';
import { MeetingsAdministradorUpdateComponent } from './pages/meetings-administrador-update/meetings-administrador-update.component';
import { MeetingsCuentaPageComponent } from './pages/meetings-cuenta-page/meetings-cuenta-page.component';
import { MeetingsCreateComponent } from './pages/meetings-create/meetings-create.component';
import { MeetingsUpdateComponent } from './pages/meetings-update/meetings-update.component';
import { ModalEliminarMeetingsCuentaComponent } from './components/modal-eliminar-meetings-cuenta/modal-eliminar-meetings-cuenta.component';
import { ModalEliminarMeetingsAdministradorComponent } from './components/modal-eliminar-meetings-administrador/modal-eliminar-meetings-administrador.component';
import { FormMeetingsComponent } from './components/form-meetings/form-meetings.component';
import { FormMeetingsCuentaComponent } from './components/form-meetings-cuenta/form-meetings-cuenta.component';
import { MaterialModule } from 'src/app/core/material/material.module';

@NgModule({
  declarations: [
    MeetingsAdministradorPageComponent,
    MeetingsAdministradorCreateComponent,
    MeetingsAdministradorUpdateComponent,
    MeetingsCuentaPageComponent,
    MeetingsCreateComponent,
    MeetingsUpdateComponent,
    ModalEliminarMeetingsCuentaComponent,
    ModalEliminarMeetingsAdministradorComponent,
    FormMeetingsComponent,
    FormMeetingsCuentaComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MeetingsRoutingModule
  ],
  entryComponents:[
    ModalEliminarMeetingsAdministradorComponent,
    ModalEliminarMeetingsCuentaComponent
  ],
  exports: [
    FormMeetingsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class MeetingsModule { }
