import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from '../core/material/material.module';
import { TranslateModule } from '@ngx-translate/core';

import { AddressComponent } from './components/address/address.component';
import { LoaderComponent } from './components/loader/loader.component';
import { FormContactsComponent } from './components/enterprise/form-contacts/form-contacts.component';
import { FormEnterprisesComponent } from './components/enterprise/form-enterprises/form-enterprises.component';
import { PageFormTableComponent } from './components/tables/page-form-table/page-form-table.component';
import { PageTableComponent } from './components/tables/page-table/page-table.component';
import { HelpBottomSheetComponent } from './components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from './components/dashboard/title/title.component';
import { Ng7DynamicBreadcrumbModule } from 'ng7-dynamic-breadcrumb';
import { DeleteModalComponent } from './components/modals/delete-modal/delete-modal.component';
import { VideoPreviewComponent } from './components/modals/video-preview/video-preview.component';
import { ImagePreviewComponent } from './components/modals/image-preview/image-preview.component';
import { PdfPreviewComponent } from './components/modals/pdf-preview/pdf-preview.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ChatbotComponent } from './components/misc/chatbot/chatbot.component';
import { TaskModalComponent } from './components/modals/task-modal/task-modal.component';
import { UserTypeFilterComponent } from './components/filters/user-type-filter/user-type-filter.component';
import { SelectWithFilterComponent } from './components/misc/select-with-filter/select-with-filter.component';
import { MainFilterComponent } from './components/filters/main-filter/main-filter.component';
import { InstitutionResponsibleManagerComponent } from './components/misc/institution-responsible-manager/institution-responsible-manager.component';
import { EnterpriseResponsibleManagerComponent } from './components/misc/enterprise-responsible-manager/enterprise-responsible-manager.component';
import { AutodiagnosticoComponent } from './components/modals/autodiagnostico/autodiagnostico.component';
import { ReportesModalComponent } from './components/modals/reportes-modal/reportes-modal.component';
import { EncuestaModalComponent } from './components/modals/encuesta-modal/encuesta-modal.component';
import { VerUsuarioEmpresaModalComponent } from './components/modals/ver-usuario-empresa-modal/ver-usuario-empresa-modal.component';
import { EliminarModalComponent } from './components/modals/eliminar-modal/eliminar-modal.component';
import { VideoModalComponent } from './components/modals/video-modal/video-modal.component';
//import { ConfirmarModalComponent } from './components/modals/confirmar-modal/confirmar-modal.component';
//import { VerContactoEmpresaModalComponent } from './components/modals/ver-contacto-empresa-modal/ver-contacto-empresa-modal.component';
import { MinutaTareaModalComponent } from './components/modals/minuta-tarea-modal/minuta-tarea-modal.component';
import { PreguntaModalComponent } from './components/modals/pregunta-modal/pregunta-modal.component';
// import { ValidarConstanciaComponent } from './features/audiencia-capacitaciones/validar-constancia/validar-constancia.component';
// import { ModalAgregarTareaMinutaComponent } from './features/minutas/Modals/modal-agregar-tarea-minuta/modal-agregar-tarea-minuta.component';
// import { ModalOpcionesTareasMinutaComponent } from './features/minutas/Modals/modal-opciones-tareas-minuta/modal-opciones-tareas-minuta.component';


@NgModule({
  declarations: [
    AddressComponent,
    FormContactsComponent,
    FormEnterprisesComponent,
    LoaderComponent,
    PageFormTableComponent,
    PageTableComponent,
    HelpBottomSheetComponent,
    TitleComponent,
    DeleteModalComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    PdfPreviewComponent,
    ChatbotComponent,
    TaskModalComponent,
    UserTypeFilterComponent,
    SelectWithFilterComponent,
    MainFilterComponent,
    InstitutionResponsibleManagerComponent,
    EnterpriseResponsibleManagerComponent,
    AutodiagnosticoComponent,
    ReportesModalComponent,
    EncuestaModalComponent,
    VerUsuarioEmpresaModalComponent,
    EliminarModalComponent,
    VideoModalComponent,
    //ConfirmarModalComponent,
    MinutaTareaModalComponent,
    PreguntaModalComponent
  ],
  exports: [
    AddressComponent,
    FormContactsComponent,
    FormEnterprisesComponent,
    LoaderComponent,
    PageFormTableComponent,
    PageTableComponent,
    HelpBottomSheetComponent,
    TitleComponent,
    DeleteModalComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    PdfPreviewComponent,
    ChatbotComponent,
    TaskModalComponent,
    UserTypeFilterComponent,
    SelectWithFilterComponent,
    MainFilterComponent,
    InstitutionResponsibleManagerComponent,
    EnterpriseResponsibleManagerComponent,
    AutodiagnosticoComponent,
    ReportesModalComponent,
    EncuestaModalComponent,
    VerUsuarioEmpresaModalComponent,
    EliminarModalComponent,
    VideoModalComponent,
    //ConfirmarModalComponent,
    MinutaTareaModalComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    RouterModule,
    Ng7DynamicBreadcrumbModule,
    PdfViewerModule,
    TranslateModule
  ],
  entryComponents:[
    HelpBottomSheetComponent,
    PreguntaModalComponent
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SharedModule { }
