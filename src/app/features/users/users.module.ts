import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './pages/users-page/users-page.component';
import { UsersCreateComponent } from './pages/users-create/users-create.component';
import { UsersUpdateComponent } from './pages/users-update/users-update.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from 'src/app/core/material/material.module';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    UsersPageComponent, 
    UsersCreateComponent, 
    UsersUpdateComponent, 
    UserFormComponent
  ],
  imports: [
    UsersRoutingModule,
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    SharedModule,
  ],
  entryComponents:[
    HelpBottomSheetComponent,
    DeleteModalComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class UsersModule { }
