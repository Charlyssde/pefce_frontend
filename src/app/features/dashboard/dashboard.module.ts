
import { MaterialModule } from 'src/app/core/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ShowAgendaComponent } from './components/show-agenda/show-agenda.component';
import { ShowNotificationComponent } from './components/show-notification/show-notification.component';
import { ShowTaskComponent } from './components/show-task/show-task.component';
import { ShowProjectComponent } from './components/show-project/show-project.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgendaModule } from '../agenda/agenda.module';
import { AgendaFormComponent } from '../agenda/components/agenda-form/agenda-form.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    ShowAgendaComponent,
    ShowNotificationComponent,
    ShowTaskComponent,
    ShowProjectComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    DashboardRoutingModule,
    SharedModule,
    AgendaModule
  ],
  entryComponents:[
    ShowAgendaComponent,
    ShowNotificationComponent,
    ShowTaskComponent,
    ShowProjectComponent,
    AgendaFormComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class DashboardModule { }
