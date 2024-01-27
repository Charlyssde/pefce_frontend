import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { EventosRoutingModule } from './eventos-routing.module';
import { EventoComponent } from './evento/evento.component';
import { PageEventoComponent } from './page-evento/page-evento.component';
import { UpdateEventoComponent } from './update-evento/update-evento.component';
import { CreateEventoComponent } from './create-evento/create-evento.component';
import { FormEventoComponent } from './form-evento/form-evento.component';
import { PageEventoContactosComponent } from './page-evento-contactos/page-evento-contactos.component';
import { PageEventoEmpresaComponent } from './page-evento-empresa/page-evento-empresa.component';

@NgModule({
  declarations: [
    EventoComponent,
    UpdateEventoComponent,
    CreateEventoComponent,
    FormEventoComponent,
    PageEventoContactosComponent,
    PageEventoEmpresaComponent,
    PageEventoComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    EventosRoutingModule
  ],
  entryComponents:[
    PageEventoContactosComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class EventosModule { }
