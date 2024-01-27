import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionPaginaContenidoRoutingModule } from './administracion-pagina-contenido-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from 'src/app/core/material/material.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { AtraccionInversionesAdminComponent } from './pages/atraccion-inversiones-admin/atraccion-inversiones-admin.component';
import { ComercioExteriorAdminComponent } from './pages/comercio-exterior-admin/comercio-exterior-admin.component';
import { FooterAdminComponent } from './pages/footer-admin/footer-admin.component';
import { HeaderAdminComponent } from './pages/header-admin/header-admin.component';
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';
import { ProyectosEstrategicosAdminComponent } from './pages/proyectos-estrategicos-admin/proyectos-estrategicos-admin.component';

@NgModule({
  declarations: [
    HeaderAdminComponent,
    FooterAdminComponent,
    InicioAdminComponent,
    AtraccionInversionesAdminComponent,
    ComercioExteriorAdminComponent,
    ProyectosEstrategicosAdminComponent
  ],
  imports: [
    AdministracionPaginaContenidoRoutingModule,
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    SharedModule,
  ],
  entryComponents: [
    HelpBottomSheetComponent,
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AdministracionPaginaContenidoModule { }
