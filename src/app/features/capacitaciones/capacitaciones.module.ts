import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';

import { CapacitacionesRoutingModule } from './capacitaciones-routing.module';
import { PageCapacitacionComponent } from './pages/page-capacitacion/page-capacitacion.component'
import { PageCapacitacionContactoComponent } from './pages/page-capacitacion-contacto/page-capacitacion-contacto.component'

import { CapacitacionComponent } from './components/capacitacion/capacitacion.component';
import { CreateCapacitacionComponent } from './components/create-capacitacion/create-capacitacion.component';
import { UpdateCapacitacionComponent } from './components/update-capacitacion/update-capacitacion.component';

import { FormCapacitacionComponent } from './components/form-capacitacion/form-capacitacion.component';

import { ModuloComponent } from './modulos/modulo/modulo.component';
import { PageModuloComponent } from './modulos/page-modulo/page-modulo.component';
import { FormModuloComponent } from './modulos/form-modulo/form-modulo.component';
import { CreateModuloComponent } from './modulos/create-modulo/create-modulo.component';
import { UpdateModuloComponent } from './modulos/update-modulo/update-modulo.component';

import { TemaComponent } from './temas/tema/tema.component';
import { CreateTemaComponent } from './temas/create-tema/create-tema.component';
import { FormTemaComponent } from './temas/form-tema/form-tema.component';
import { PageTemaComponent } from './temas/page-tema/page-tema.component';
import { UpdateTemaComponent } from './temas/update-tema/update-tema.component';

import { PreguntaComponent } from './preguntas/pages/pregunta/pregunta.component';
import { CreatePreguntaComponent } from './preguntas/components/create-pregunta/create-pregunta.component';
import { FormPreguntaComponent } from './preguntas/components/form-pregunta/form-pregunta.component';
import { PagePreguntaComponent } from './preguntas/pages/page-pregunta/page-pregunta.component';
import { UpdatePreguntaComponent } from './preguntas/components/update-pregunta/update-pregunta.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VerCapacitacionContactoModalComponent } from './components/ver-capacitacion-contacto-modal/ver-capacitacion-contacto-modal.component';
import { EliminarModalComponent } from 'src/app/shared/components/modals/eliminar-modal/eliminar-modal.component';


@NgModule({
  declarations: [
    PageCapacitacionComponent,
    PageCapacitacionContactoComponent,
    CapacitacionComponent,
    CreateCapacitacionComponent,
    UpdateCapacitacionComponent,
    FormCapacitacionComponent,
    ModuloComponent,
    PageModuloComponent,
    FormModuloComponent,
    CreateModuloComponent,
    UpdateModuloComponent,
    TemaComponent,
    CreateTemaComponent,
    FormTemaComponent,
    PageTemaComponent,
    UpdateTemaComponent,
    PreguntaComponent,
    CreatePreguntaComponent,
    FormPreguntaComponent,
    PagePreguntaComponent,
    UpdatePreguntaComponent,
    VerCapacitacionContactoModalComponent
  ],
  imports: [
    CommonModule,
    CapacitacionesRoutingModule,
    MaterialModule,
    SharedModule
  ],
  exports: [

  ],
  entryComponents:[
    VerCapacitacionContactoModalComponent,
    EliminarModalComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CapacitacionesModule { }
