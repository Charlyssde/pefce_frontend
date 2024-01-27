import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtraccionInversionesAdminComponent } from './pages/atraccion-inversiones-admin/atraccion-inversiones-admin.component';
import { ComercioExteriorAdminComponent } from './pages/comercio-exterior-admin/comercio-exterior-admin.component';
import { FooterAdminComponent } from './pages/footer-admin/footer-admin.component';
import { HeaderAdminComponent } from './pages/header-admin/header-admin.component';
import { InicioAdminComponent } from './pages/inicio-admin/inicio-admin.component';
import { ProyectosEstrategicosAdminComponent } from './pages/proyectos-estrategicos-admin/proyectos-estrategicos-admin.component';


const routes: Routes = [
  {
    path: '',
    data: { title: 'Administración de portal' },
    children: [
      {
        path: 'header',
        component: HeaderAdminComponent,
        data: { title: 'Header', breadcrumb: [{ label: "Administracion de portal", url: '' }, { label: 'Header', url: '/administracion-portal/header' }] }
      },
      {
        path: 'footer',
        component: FooterAdminComponent,
        data: { title: 'Footer', breadcrumb: [{ label: "Administracion de portal", url: '' }, { label: 'Footer', url: '/administracion-portal/footer' }] }
      },
      {
        path: 'inicio',
        component: InicioAdminComponent,
        data: { title: 'Inicio', breadcrumb: [{ label: "Administracion de portal", url: '' }, { label: 'Inicio', url: '/administracion-portal/inicio' }] }
      },
      {
        path: 'atraccion-inversiones',
        component: AtraccionInversionesAdminComponent,
        data: { title: 'Atracción de inversiones', breadcrumb: [{ label: "Administracion de portal", url: '' }, { label: 'Atracción de inversiones', url: '/administracion-portal/atraccion-inversiones' }] }
      },
      {
        path: 'comercio-exterior',
        component: ComercioExteriorAdminComponent,
        data: { title: 'Comercio exterior', breadcrumb: [{ label: "Administracion de portal", url: '' }, { label: 'Comercio exterior', url: '/administracion-portal/comercio-exterior' }] }
      },
      {
        path: 'proyectos-estrategicos',
        component: ProyectosEstrategicosAdminComponent,
        data: { title: 'Proyectos estratégicos', breadcrumb: [{ label: "Administracion de portal", url: '' }, { label: 'Header', url: '/administracion-portal/proyectos-estrategicos' }] }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionPaginaContenidoRoutingModule { }
