import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterprisesRoutingModule } from './enterprises-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from 'src/app/core/material/material.module';
import { EnterprisesPageComponent } from './pages/enterprises-page/enterprises-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { EnterprisesCreateComponent } from './pages/enterprises-create/enterprises-create.component';
import { EnterpriseFormComponent } from './components/enterprise-form/enterprise-form.component';
import { EnterprisesUpdateComponent } from './pages/enterprises-update/enterprises-update.component';
import { EnterpriseDetailsComponent } from './components/enterprise-details/enterprise-details.component';
import { EnterpriseAccessRequestComponent } from './components/enterprise-access-request/enterprise-access-request.component';
import { EnterpriseAccessRequestHistoryComponent } from './components/enterprise-access-request-history/enterprise-access-request-history.component';
import { EnterpriseContactsPageComponent } from './pages/enterprise-contacts-page/enterprise-contacts-page.component';
import { EnterpriseContactsCreateComponent } from './pages/enterprise-contacts-create/enterprise-contacts-create.component';
import { EnterpriseContactsUpdateComponent } from './pages/enterprise-contacts-update/enterprise-contacts-update.component';
import { EnterpriseContactFormComponent } from './components/enterprise-contact-form/enterprise-contact-form.component';
import { EnterpriseTradeImageComponent } from './pages/enterprise-trade-image/enterprise-trade-image.component';
import { EnterpriseProductPageComponent } from './pages/enterprise-product-page/enterprise-product-page.component';
import { EnterpriseProductCreateComponent } from './pages/enterprise-product-create/enterprise-product-create.component';
import { EnterpriseProductUpdateComponent } from './pages/enterprise-product-update/enterprise-product-update.component';
import { EnterpriseProductFormComponent } from './components/enterprise-product-form/enterprise-product-form.component';
import { EnterpriseProductDetailsComponent } from './components/enterprise-product-details/enterprise-product-details.component';
import { QuillModule } from 'ngx-quill';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ImagePreviewComponent } from 'src/app/shared/components/modals/image-preview/image-preview.component';
import { VideoPreviewComponent } from 'src/app/shared/components/modals/video-preview/video-preview.component';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { EnterpriseStandComponent } from './pages/enterprise-stand/enterprise-stand.component';
import { EnterpriseStandViewComponent } from './components/enterprise-stand-view/enterprise-stand-view.component';
import { AutodiagnosticoComponent } from 'src/app/shared/components/modals/autodiagnostico/autodiagnostico.component';

@NgModule({
  declarations: [
    EnterprisesPageComponent,
    EnterprisesCreateComponent,
    EnterpriseFormComponent,
    EnterprisesUpdateComponent,
    EnterpriseDetailsComponent,
    EnterpriseAccessRequestComponent,
    EnterpriseAccessRequestHistoryComponent,
    EnterpriseContactsPageComponent,
    EnterpriseContactsCreateComponent,
    EnterpriseContactsUpdateComponent,
    EnterpriseContactFormComponent,
    EnterpriseTradeImageComponent,
    EnterpriseProductPageComponent,
    EnterpriseProductCreateComponent,
    EnterpriseProductUpdateComponent,
    EnterpriseProductFormComponent,
    EnterpriseProductDetailsComponent,
    EnterpriseStandComponent,
    EnterpriseStandViewComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    SharedModule,
    EnterprisesRoutingModule,
    QuillModule,
    PdfViewerModule,
    MatCarouselModule.forRoot()
  ],
  exports:[
    EnterpriseStandViewComponent
  ],
  entryComponents:[
    HelpBottomSheetComponent,
    DeleteModalComponent,
    EnterpriseDetailsComponent,
    EnterpriseAccessRequestComponent,
    EnterpriseAccessRequestHistoryComponent,
    EnterpriseProductDetailsComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    PdfPreviewComponent,
    AutodiagnosticoComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class EnterprisesModule { }
