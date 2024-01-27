import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';

import { AudienciaCapacitacionesRoutingModule } from './audiencia-capacitaciones-routing.module';
import { AudienciaCapacitacionesComponent } from './audiencia-capacitaciones/audiencia-capacitaciones.component';

import { CardCapacitacionComponent } from '../audiencia-capacitaciones/card-capacitacion/card-capacitacion.component';
import { AulaComponent } from '../audiencia-capacitaciones/aula/aula/aula.component';
import { AulaModuloComponent } from '../audiencia-capacitaciones/aula/aula-modulo/aula-modulo.component';
import { AulaTemaComponent } from '../audiencia-capacitaciones/aula/aula-tema/aula-tema.component';
import { CuestionarioComponent } from '../audiencia-capacitaciones/cuestionario/cuestionario/cuestionario.component';
import { CuestionarioPreguntaComponent } from '../audiencia-capacitaciones/cuestionario/cuestionario-pregunta/cuestionario-pregunta.component';
import { AulaProgresoComponent } from '../audiencia-capacitaciones/aula/aula-progreso/aula-progreso.component';
import { ProgresoModuloComponent } from '../audiencia-capacitaciones/aula/aula-progreso/progreso-modulo/progreso-modulo.component';
import { ProgresoPreguntasComponent } from '../audiencia-capacitaciones/aula/aula-progreso/progreso-preguntas/progreso-preguntas.component';
import { ValidarConstanciaComponent } from './validar-constancia/validar-constancia.component';
import { ConfirmarModalComponent } from './confirmar-modal/confirmar-modal.component';

@NgModule({
  declarations: [
    AudienciaCapacitacionesComponent,
    CardCapacitacionComponent,
    AulaComponent,
    AulaModuloComponent,
    AulaTemaComponent,
    CuestionarioComponent,
    CuestionarioPreguntaComponent,
    AulaProgresoComponent,
    ProgresoModuloComponent,
    ProgresoPreguntasComponent,
    ValidarConstanciaComponent,
    ConfirmarModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AudienciaCapacitacionesRoutingModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AudienciaCapacitacionesModule { }
