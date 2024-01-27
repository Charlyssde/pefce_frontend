import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component'; 
import { TaskModalComponent } from 'src/app/shared/components/modals/task-modal/task-modal.component'; 
import { QuillModule } from 'ngx-quill';
import { TasksRoutingModule } from './tasks-routing.module';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { ReportesModalComponent } from 'src/app/shared/components/modals/reportes-modal/reportes-modal.component';

@NgModule({
  declarations: [
    TasksPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    TasksRoutingModule,
    QuillModule
  ],
  entryComponents:[
    HelpBottomSheetComponent,
    DeleteModalComponent,
    TaskModalComponent,
    ReportesModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],  
})
export class TasksModule { }
