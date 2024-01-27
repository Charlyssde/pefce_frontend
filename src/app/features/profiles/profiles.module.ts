import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/core/material/material.module';
import { ProfilesPageComponent } from './pages/profiles-page/profiles-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PageTableComponent } from 'src/app/shared/components/tables/page-table/page-table.component';
import { ProfilesCreateComponent } from './pages/profiles-create/profiles-create.component';
import { ProfilesUpdateComponent } from './pages/profiles-update/profiles-update.component';
import { ProfilesOrganizationPageComponent } from './pages/profiles-organization-page/profiles-organization-page.component';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { NgxOrgChartModule } from 'ngx-org-chart';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';

@NgModule({
  declarations: [
    ProfilesPageComponent,
    ProfilesCreateComponent,
    ProfilesUpdateComponent,
    ProfileFormComponent,
    ProfilesOrganizationPageComponent
  ],
  imports: [
    ProfilesRoutingModule,
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    SharedModule,
    NgxOrgChartModule
  ],
  entryComponents: [
    PageTableComponent,
    HelpBottomSheetComponent,
    DeleteModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProfilesModule { }
