import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { SessionsComponent } from './pages/sessions/sessions.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    SessionsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    LogsRoutingModule
  ]
})
export class LogsModule { }
