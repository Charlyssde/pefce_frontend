
import { MaterialModule } from 'src/app/core/material/material.module';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';

import { ProyectosPageComponent } from './pages/proyectos-page/proyectos-page.component';
import { ProyectosPanelComponent } from './pages/proyectos-panel/proyectos-panel.component';
import { ProyectosPipelineComponent } from './pages/proyectos-pipeline/proyectos-pipeline.component';
import { ProyectosCreateComponent } from './pages/proyectos-create/proyectos-create.component';
import { ProyectosUpdateComponent } from './pages/proyectos-update/proyectos-update.component';

import { ModalVerDetalleProyectoComponent } from './components/modal-ver-detalle-proyecto/modal-ver-detalle-proyecto.component';
import { ModalAgregarAccionPanelProyectoComponent } from './components/modal-agregar-accion-panel-proyecto/modal-agregar-accion-panel-proyecto.component';
import { ModalAgregarColaboradorPanelProyectoComponent } from './components/modal-agregar-colaborador-panel-proyecto/modal-agregar-colaborador-panel-proyecto.component';
import { ModalAgregarTareaPanelProyectoComponent } from './components/modal-agregar-tarea-panel-proyecto/modal-agregar-tarea-panel-proyecto.component';
import { ModalEditarAccionPanelProyectoComponent } from './components/modal-editar-accion-panel-proyecto/modal-editar-accion-panel-proyecto.component';
import { ModalEliminarAccionPanelProyectoComponent } from './components/modal-eliminar-accion-panel-proyecto/modal-eliminar-accion-panel-proyecto.component';
import { ModalOpcionesColaboradorPanelProyectoComponent } from './components/modal-opciones-colaborador-panel-proyecto/modal-opciones-colaborador-panel-proyecto.component';
import { ModalOpcionesTareasPanelProyectosComponent } from './components/modal-opciones-tareas-panel-proyectos/modal-opciones-tareas-panel-proyectos.component';
import { FormProyectosComponent } from './components/form-proyectos/form-proyectos.component';
import { ModalAgregarPlantillatareasPanelProyectoComponent } from './components/modal-agregar-plantillatareas-panel-proyecto/modal-agregar-plantillatareas-panel-proyecto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { QuillModule } from 'ngx-quill';
import { ModalCreateMeetingPanelProyectoComponent } from './components/modal-create-meeting-panel-proyecto/modal-create-meeting-panel-proyecto.component';
import { FormMeetingsComponent } from '../meetings/components/form-meetings/form-meetings.component';
import { MeetingsModule } from '../meetings/meetings.module';

@NgModule({
  declarations: [
    ProyectosPageComponent,
    ProyectosCreateComponent,
    ProyectosUpdateComponent,
    ProyectosPanelComponent,
    ProyectosPipelineComponent,
    ModalVerDetalleProyectoComponent,
    ModalAgregarAccionPanelProyectoComponent,
    ModalAgregarColaboradorPanelProyectoComponent,
    ModalAgregarTareaPanelProyectoComponent,
    ModalEditarAccionPanelProyectoComponent,
    ModalEliminarAccionPanelProyectoComponent,
    ModalOpcionesColaboradorPanelProyectoComponent,
    ModalOpcionesTareasPanelProyectosComponent,
    FormProyectosComponent,
    ModalAgregarPlantillatareasPanelProyectoComponent,
    ModalCreateMeetingPanelProyectoComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule,
    ProyectosRoutingModule,
    SharedModule,
    QuillModule,
    MeetingsModule
  ],
  entryComponents:[
    ModalVerDetalleProyectoComponent,
    ModalAgregarColaboradorPanelProyectoComponent,
    ModalAgregarTareaPanelProyectoComponent,
    ModalEditarAccionPanelProyectoComponent,
    ModalEliminarAccionPanelProyectoComponent,
    ModalOpcionesColaboradorPanelProyectoComponent,
    ModalOpcionesTareasPanelProyectosComponent,
    ModalAgregarPlantillatareasPanelProyectoComponent,
    ModalAgregarAccionPanelProyectoComponent,
    ModalCreateMeetingPanelProyectoComponent,
    FormMeetingsComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ProyectosModule { }
