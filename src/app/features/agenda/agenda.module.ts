import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaPageComponent } from './pages/agenda-page/agenda-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { QuillModule } from 'ngx-quill';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgendaCalendarComponent } from './components/agenda-calendar/agenda-calendar.component';
import { AgendaFormComponent } from './components/agenda-form/agenda-form.component';

@NgModule({
  declarations: [
    AgendaPageComponent,
    AgendaCalendarComponent,
    AgendaFormComponent,
  ],
  imports: [
    AgendaRoutingModule,
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    SharedModule,
    QuillModule,
  ],
  exports:[
    AgendaCalendarComponent,
    AgendaFormComponent
  ],
  entryComponents:[
    AgendaFormComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AgendaModule { }
