import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogosRoutingModule } from './catalogos-routing.module';
import { CatalogoIdiomasComponent } from './pages/catalogo-idiomas/catalogo-idiomas.component';
import { CatalogoAreasComponent } from './pages/catalogo-areas/catalogo-areas.component';
import { CatalogoClaseMinutaComponent } from './pages/catalogo-clase-minuta/catalogo-clase-minuta.component';
import { CatalogoEstatusProyectosComponent } from './pages/catalogo-estatus-proyectos/catalogo-estatus-proyectos.component';
import { CatalogoFuentesComponent } from './pages/catalogo-fuentes/catalogo-fuentes.component';
import { CatalogoPaisComponent } from './pages/catalogo-pais/catalogo-pais.component';
import { CatalogoParquesIndustrialesComponent } from './pages/catalogo-parques-industriales/catalogo-parques-industriales.component';
import { CatalogoPrioridadProyectosComponent } from './pages/catalogo-prioridad-proyectos/catalogo-prioridad-proyectos.component';
import { CatalogoRegimenFiscalComponent } from './pages/catalogo-regimen-fiscal/catalogo-regimen-fiscal.component';
import { CatalogoSectoresComponent } from './pages/catalogo-sectores/catalogo-sectores.component';
import { CatalogoTemaMinutaComponent } from './pages/catalogo-tema-minuta/catalogo-tema-minuta.component';
import { CatalogoTipoEmpresaComponent } from './pages/catalogo-tipo-empresa/catalogo-tipo-empresa.component';
import { CatalogoTipoEventoComponent } from './pages/catalogo-tipo-evento/catalogo-tipo-evento.component';
import { CatalogoTipoMesaNegociacionComponent } from './pages/catalogo-tipo-mesa-negociacion/catalogo-tipo-mesa-negociacion.component';
import { CatalogoTipoMinutaComponent } from './pages/catalogo-tipo-minuta/catalogo-tipo-minuta.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from 'src/app/core/material/material.module';
import { PageFormTableComponent } from 'src/app/shared/components/tables/page-form-table/page-form-table.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CatalogosFormComponent } from './components/catalogos-form/catalogos-form.component';
import { CatalogoSubsectoresComponent } from './pages/catalogo-subsectores/catalogo-subsectores.component';
import { CatalogoIdiomasEtiquetasComponent } from './pages/catalogo-idiomas-etiquetas/catalogo-idiomas-etiquetas.component';
import { CatalogosIdiomasFormComponent } from './components/catalogos-idiomas-form/catalogos-idiomas-form.component';

@NgModule({
  declarations: [
    CatalogoAreasComponent,
    CatalogoEstatusProyectosComponent,
    CatalogoPrioridadProyectosComponent,
    CatalogoIdiomasComponent,
    CatalogoFuentesComponent,
    CatalogoPaisComponent,
    CatalogoParquesIndustrialesComponent,
    CatalogoSectoresComponent,
    CatalogoTipoEmpresaComponent,
    CatalogoTipoMinutaComponent,
    CatalogoClaseMinutaComponent,
    CatalogoTemaMinutaComponent,
    CatalogoTipoEventoComponent,
    CatalogoTipoMesaNegociacionComponent,
    CatalogoRegimenFiscalComponent,
    CatalogoIdiomasComponent,
    CatalogosFormComponent,
    CatalogoSubsectoresComponent,
    CatalogoIdiomasEtiquetasComponent,
    CatalogosIdiomasFormComponent,
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    CatalogosRoutingModule,
    SharedModule
  ],
  entryComponents:[
    PageFormTableComponent,
    CatalogosFormComponent,
    CatalogosIdiomasFormComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CatalogosModule { }
