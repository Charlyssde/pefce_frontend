import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component'; 
import { QuillModule } from 'ngx-quill';
import { AdministracionEncuestasRoutingModule } from './administracion-encuestas-routing.module';
import { AdministracionEncuestasPageComponent } from './pages/administracionencuestas-page/administracionencuestas-page.component';
import { AdministracionEncuestasCreateComponent } from './components/administracionencuestas-create/administracionencuestas-create.component';
import { AdministracionencuestasFormComponent } from './components/administracionencuestas-form/administracionencuestas-form.component'
@NgModule({
  declarations: [    
    AdministracionEncuestasPageComponent,
    AdministracionEncuestasCreateComponent,
    AdministracionencuestasFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    AdministracionEncuestasRoutingModule,    
    QuillModule
  ],
  entryComponents:[
    HelpBottomSheetComponent,
    DeleteModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],  
})
export class AdministracionEncuestasModule { }
