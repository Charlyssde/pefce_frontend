import { SolicitudesFormComponent } from './components/solicitudes-form/solicitudes-form.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { SolicitudesPageComponent } from './pages/solicitudes-page/solicitudes-page.component';
import { SolicitudesCreateComponent } from './pages/solicitudes-create/solicitudes-create.component';
import { SolicitudesUpdateComponent } from './pages/solicitudes-update/solicitudes-update.component';
import { SolicitudesDeleteComponent } from './components/solicitudes-delete/solicitudes-delete.component';
import { SolicitudesNavesFormComponent } from './components/solicitudes-naves-form/solicitudes-naves-form.component';
import { SolicitudesPromocionesFormComponent } from './components/solicitudes-promociones-form/solicitudes-promociones-form.component';
import { SolicitudesVinculacionesFormComponent } from './components/solicitudes-vinculaciones-form/solicitudes-vinculaciones-form.component';
import { SolicitudesAsistenciaEventosFormComponent } from './components/solicitudes-asistencia-eventos-form/solicitudes-asistencia-eventos-form.component';
import { ModalSolicitudesHistoricoComponent } from './components/modal-solicitudes-historico/modal-solicitudes-historico.component';
import { ModalSolicitudesFinalizarComponent } from './components/modal-solicitudes-finalizar/modal-solicitudes-finalizar.component';
import { ReportesModalComponent } from 'src/app/shared/components/modals/reportes-modal/reportes-modal.component';

@NgModule({
  declarations: [
    SolicitudesPageComponent,
    SolicitudesCreateComponent,
    SolicitudesUpdateComponent,
    SolicitudesDeleteComponent,
    SolicitudesFormComponent,
    SolicitudesNavesFormComponent,
    SolicitudesPromocionesFormComponent,
    SolicitudesVinculacionesFormComponent,
    SolicitudesAsistenciaEventosFormComponent,
    ModalSolicitudesHistoricoComponent,
    ModalSolicitudesFinalizarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    SolicitudesRoutingModule
  ],
  entryComponents:[
    ModalSolicitudesHistoricoComponent,
    ModalSolicitudesFinalizarComponent,
    ReportesModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class SolicitudesModule { }
