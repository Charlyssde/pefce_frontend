import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExplorersRoutingModule } from './explorers-routing.module';
import { ExplorerHomePageComponent } from './pages/explorer-home-page/explorer-home-page.component';
import { ExplorerEnterprisesPageComponent } from './pages/explorer-enterprises-page/explorer-enterprises-page.component';
import { ExplorerTrainingsPageComponent } from './pages/explorer-trainings-page/explorer-trainings-page.component';
import { ExplorerEventsPageComponent } from './pages/explorer-events-page/explorer-events-page.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from 'src/app/core/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { ImagePreviewComponent } from 'src/app/shared/components/modals/image-preview/image-preview.component';
import { PdfPreviewComponent } from 'src/app/shared/components/modals/pdf-preview/pdf-preview.component';
import { VideoPreviewComponent } from 'src/app/shared/components/modals/video-preview/video-preview.component';
import { ExplorerEnterprisesStandComponent } from './pages/explorer-enterprises-stand/explorer-enterprises-stand.component';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { QuillModule } from 'ngx-quill';
import { EnterprisesModule } from '../enterprises/enterprises.module';
import { AutodiagnosticoComponent } from 'src/app/shared/components/modals/autodiagnostico/autodiagnostico.component'; 
import { ExploradorEventosComponent } from './pages/explorador-eventos/explorador-eventos.component';
import { VerInfoEventoComponent } from './pages/explorador-eventos/detalles-evento/ver-info-evento/ver-info-evento.component';
import { VerVideoEventoComponent } from './pages/explorador-eventos/detalles-evento/ver-video-evento/ver-video-evento.component';
import { RegistroEventoComponent } from './pages/explorador-eventos/detalles-evento/registro-evento/registro-evento.component';
import { ModalSolicitarMesaComponent } from './components/modal-solicitar-mesa/modal-solicitar-mesa.component';
import { ModalRegistroEventosComponent } from './components/modal-registro-eventos/modal-registro-eventos.component';

@NgModule({
  declarations: [
    ExplorerHomePageComponent, 
    ExplorerEnterprisesPageComponent, 
    ExplorerTrainingsPageComponent, 
    ExplorerEventsPageComponent, 
    ExplorerEnterprisesStandComponent,
    ExploradorEventosComponent,
    VerInfoEventoComponent,
    VerVideoEventoComponent,
    RegistroEventoComponent,
    ModalSolicitarMesaComponent,
    ModalRegistroEventosComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    SharedModule,
    ExplorersRoutingModule,
    QuillModule,
    PdfViewerModule,
    MatCarouselModule.forRoot(),
    EnterprisesModule
  ],
  entryComponents: [
    HelpBottomSheetComponent,
    ImagePreviewComponent,
    VideoPreviewComponent,
    PdfPreviewComponent,
    AutodiagnosticoComponent,
    ModalSolicitarMesaComponent,
    ModalRegistroEventosComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ExplorersModule { }
