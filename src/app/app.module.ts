import { LOCALE_ID, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
// 
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/material/material.module';
import { MatPaginatorIntl, MAT_DATE_LOCALE } from '@angular/material';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { AnimateOnScrollModule } from 'ng2-animate-on-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavigationComponent } from './layouts/navigation/navigation.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEs, 'es');
import { FullCalendarModule } from '@fullcalendar/angular';
import { QuillModule } from 'ngx-quill';
import { MatPaginationES } from './common/MatPaginationES';
import { NgxCurrencyModule } from 'ngx-currency';
import { RouterModule } from '@angular/router';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AuthInterceptor } from './core/interceptors/auth-interceptor.service';
import { AuthGuard } from './core/guards/auth-guard.guard';
import { AuthLayoutComponent } from './core/layouts/auth/auth-layout.component';
import { DashboardLayoutComponent } from './core/layouts/dashboard/dashboard-layout.component';
import { HeaderComponent as SiteHeader } from './core/layouts/header/header.component';
import { WebsiteLayoutComponent } from './core/layouts/website/website-layout.component';
import { TranslationComponent } from './shared/components/translation/translation.component';
import { HeaderComponent } from './features/pagina-contenido/components/header/header.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { ContenidoComponent } from './layouts/contenido/contenido.component';

import { ComponentsModule } from './components/components.module';

import { SharedModule } from './shared/shared.module';

import { ProyectosModule } from './features/proyectos/proyectos.module';
import { EventosModule } from './features/eventos/eventos.module';
import { SolicitudesModule } from './features/solicitudes/solicitudes.module';
import { CatalogosModule } from './features/catalogos/catalogos.module';
import { PaginaContenidoModule } from './features/pagina-contenido/pagina-contenido.module';
import { AuthModule } from './features/auth/auth.module';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { ProfilesModule } from './features/profiles/profiles.module';
import { AdministracionPaginaContenidoModule } from './features/administracion-pagina-contenido/administracion-pagina-contenido.module';
import { EnterprisesModule } from './features/enterprises/enterprises.module';
import { AdministracionEncuestasModule } from './features/administracion-encuestas/administracion-encuestas.module';
import { TasksModule } from './features/tasks/tasks.module';
import { AgendaModule } from './features/agenda/agenda.module';
import { LogsModule } from './features/logs/logs.module';
import { CapacitacionesModule } from './features/capacitaciones/capacitaciones.module';
import { PromocionDigitalModule } from './features/promocion-digital/promocion-digital.module';
import { PlantillasModule } from './features/plantillas/plantillas.module';
import { AudienciaCapacitacionesModule } from './features/audiencia-capacitaciones/audiencia-capacitaciones.module';
import { MinutasModule } from './features/minutas/minutas.module';
import { SystemModule } from './features/system/system.module';

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    WebsiteLayoutComponent,
    DashboardLayoutComponent,
    SiteHeader,
    HeaderComponent,
    NavigationComponent,
    TranslationComponent,
    ContenidoComponent,
  

  ],
  imports: [
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    MatCarouselModule.forRoot(),
    AnimateOnScrollModule.forRoot(),
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    FormsModule,
    BrowserAnimationsModule,  
    FullCalendarModule,
    FlexLayoutModule,
    MaterialModule,
    PdfViewerModule,
    QuillModule.forRoot(),
    NgxCurrencyModule,
    DragDropModule,
    ComponentsModule,   
    AuthModule,
    AdministracionPaginaContenidoModule,
    DashboardModule,
    PaginaContenidoModule,
    CatalogosModule,
    EventosModule,
    ProyectosModule,
    SolicitudesModule,
    ProfilesModule,
    EnterprisesModule,
    AdministracionEncuestasModule,
    TasksModule,
    AgendaModule,
    LogsModule,
    SharedModule,
    CapacitacionesModule,
    PromocionDigitalModule,
    PlantillasModule,
    AudienciaCapacitacionesModule,
    MinutasModule,
    SystemModule,
  ],
  entryComponents: [
    LoaderComponent,
    TranslationComponent,
    HeaderComponent,

  ],
  providers: [
    {
      provide: MatPaginatorIntl, useValue: MatPaginationES()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, 
      multi: true
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'es-MX'
    },
    {
      provide: LOCALE_ID,
      useValue: 'es'
    },
    AuthGuard,
    DatePipe,
    ContenidoComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
