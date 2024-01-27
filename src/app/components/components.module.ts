import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule
} from '@angular/core'
import { BuscadorFiltrosComponent } from './buscador-filtros/buscador-filtros.component';
import {MaterialModule} from 'src/app/core/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BuscadorFiltrosComponent
  ],imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    BuscadorFiltrosComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
}) export class ComponentsModule {}
