import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaContenidoRoutingModule } from './pagina-contenido-routing.module';
import { AtraccionInversionesComponent } from './pages/atraccion-inversiones/atraccion-inversiones.component';
import { ComercioExteriorComponent } from './pages/comercio-exterior/comercio-exterior.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProyectosEstrategicosComponent } from './pages/proyectos-estrategicos/proyectos-estrategicos.component';
import { MaterialModule } from 'src/app/core/material/material.module';
import { InterestingSitesSectionComponent } from './components/interesting-sites-section/interesting-sites-section.component';
import { InternalLinksSectionComponent } from './components/internal-links-section/internal-links-section.component';
import { PortalCarouselComponent } from './components/portal-carousel/portal-carousel.component';
import { PortalVideoPlayerComponent } from './components/portal-video-player/portal-video-player.component';
import { SocialNetworksComponent } from './components/social-networks/social-networks.component';
import { TitleAreaSectionComponent } from './components/title-area-section/title-area-section.component';
import { WelcomeSectionComponent } from './components/welcome-section/welcome-section.component';
import { FooterComponent } from 'src/app/core/layouts/footer/footer.component';
import { ContactSectionComponent } from './components/contact-section/contact-section.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FooterComponent,
    InicioComponent,
    // LoginComponent,
    //CreateDirectorioEmpresarialContenidoComponent,
    AtraccionInversionesComponent,
    ComercioExteriorComponent,
    ProyectosEstrategicosComponent,
    InterestingSitesSectionComponent,
    WelcomeSectionComponent,
    TitleAreaSectionComponent,
    InternalLinksSectionComponent,
    PortalCarouselComponent,
    PortalVideoPlayerComponent,
    SocialNetworksComponent,
    ContactSectionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PaginaContenidoRoutingModule,
    TranslateModule,
  ],
  entryComponents: [
    FooterComponent,
    InterestingSitesSectionComponent,
    WelcomeSectionComponent,
    TitleAreaSectionComponent,
    InternalLinksSectionComponent,
    PortalCarouselComponent,
    PortalVideoPlayerComponent,
    SocialNetworksComponent,
    ContactSectionComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PaginaContenidoModule { }
