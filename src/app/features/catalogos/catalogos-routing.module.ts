import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { CatalogoSubsectoresComponent } from './pages/catalogo-subsectores/catalogo-subsectores.component';
import { CatalogoIdiomasEtiquetasComponent } from './pages/catalogo-idiomas-etiquetas/catalogo-idiomas-etiquetas.component';

const routes: Routes = [
  {
    path: '',
    data: { 'title': 'Catalogos' },
    children: [
      { path: 'areas', component: CatalogoAreasComponent, data: {title: 'Áreas', breadcrumb: [{label: 'catalogos',url: ''},{label: 'areas',url: '/catalogos/areas'}]} },
      { path: 'estatusProyecto', component: CatalogoEstatusProyectosComponent, data: {title: 'Estatus del proyecto', breadcrumb: [{label: 'estatusProyecto',url: ''},{label: 'sectores',url: '/catalogos/estatusProyecto'}]} },
      { path: 'prioridadProyecto', component: CatalogoPrioridadProyectosComponent, data: {title: 'Prioridad del proyecto', breadcrumb: [{label: 'catalogos',url: ''},{label: 'prioridadProyecto',url: '/catalogos/prioridadProyecto'}]} },
      { path: 'idiomas', component: CatalogoIdiomasComponent, data: {title: 'Idiomas', breadcrumb: [{label: 'catalogos',url: ''},{label: 'idiomas',url: '/catalogos/idiomas'}]} },
      { path: 'idiomas/:padreId/etiquetas', component: CatalogoIdiomasEtiquetasComponent, data: {title: 'Idiomas', breadcrumb: [{label: 'catalogos',url: ''},{label: 'idiomas',url: '/catalogos/idiomas'},{label:'{{padreId}}', url:''},{label: 'etiquetas',url: '/catalogos/idiomas/:padreId/etiquetas'}]} },
      { path: 'fuentes', component: CatalogoFuentesComponent, data: {title: 'Fuentes', breadcrumb: [{label: 'catalogos',url: ''},{label: 'fuentes',url: '/catalogos/fuentes'}]} },
      { path: 'pais', component: CatalogoPaisComponent, data: {title: 'Pais', breadcrumb: [{label: 'catalogos',url: ''},{label: 'pais',url: '/catalogos/pais'}]} },
      { path: 'parquesIndustriales', component: CatalogoParquesIndustrialesComponent, data: {title: 'Parques industriales', breadcrumb: [{label: 'catalogos',url: ''},{label: 'parquesIndustriales',url: '/catalogos/parquesIndustriales'}]} },
      { path: 'sectores', component: CatalogoSectoresComponent, data: {title: 'Sectores', breadcrumb: [{label: 'catalogos',url: ''},{label: 'sectores',url: '/catalogos/sectores'}]} },
      { path: 'sectores/:padreId/subsectores', component: CatalogoSubsectoresComponent, data: {title: 'Subsectores', breadcrumb: [{label: 'catalogos',url: ''},{label: 'sectores',url: '/catalogos/sectores'},{label:'{{padreId}}', url:''},{label: 'subsectores',url: '/catalogos/sectores/:padreId/subsectores'}]}},
      { path: 'tipoEmpresa', component: CatalogoTipoEmpresaComponent, data: {title: 'Tipo de empresa', breadcrumb: [{label: 'catalogos',url: ''},{label: 'tipoEmpresa',url: '/catalogos/tipoEmpresa'}]} },
      { path: 'tipoMinuta', component: CatalogoTipoMinutaComponent, data: {title: 'Tipo de minuta', breadcrumb: [{label: 'catalogos',url: ''},{label: 'tipoMinuta',url: '/catalogos/tipoMinuta'}]} },
      { path: 'claseMinuta', component: CatalogoClaseMinutaComponent, data: {title: 'Clase de minuta', breadcrumb: [{label: 'catalogos',url: ''},{label: 'claseMinuta',url: '/catalogos/claseMinuta'}]} },
      { path: 'temaMinuta', component: CatalogoTemaMinutaComponent, data: {title: 'Tema de minuta', breadcrumb: [{label: 'catalogos',url: ''},{label: 'temaMinuta',url: '/catalogos/temaMinuta'}]} },
      { path: 'tipoEvento', component: CatalogoTipoEventoComponent, data: {title: 'Tipo de evento', breadcrumb: [{label: 'catalogos',url: ''},{label: 'tipoEvento',url: '/catalogos/tipoEvento'}]} },
      { path: 'tipoMesaNegociacion', component: CatalogoTipoMesaNegociacionComponent, data: {title: 'Tipo de mesa de negociación', breadcrumb: [{label: 'catalogos',url: ''},{label: 'tipoMesaNegociacion',url: '/catalogos/tipoMesaNegociacion'}]} },
      { path: 'regimenFiscal', component: CatalogoRegimenFiscalComponent, data: {title: 'Régimen fiscal', breadcrumb: [{label: 'catalogos',url: ''},{label: 'regimenFiscal',url: '/catalogos/regimenFiscal'}]} },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogosRoutingModule { }
