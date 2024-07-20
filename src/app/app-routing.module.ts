import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard.guard';

import { AuthLayoutComponent } from './core/layouts/auth/auth-layout.component';
import { WebsiteLayoutComponent } from './core/layouts/website/website-layout.component';
import { DashboardLayoutComponent } from './core/layouts/dashboard/dashboard-layout.component';
import { MyProfileComponent } from './features/auth/pages/my-profile/my-profile.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [{ path: '', loadChildren: './features/auth/auth.module#AuthModule' }]

  },

  // Website routes
  {
    path: '',
    component: WebsiteLayoutComponent,
    children: [{ path: '', loadChildren: './features/pagina-contenido/pagina-contenido.module#PaginaContenidoModule' }]
  },

  // Dashboard routes
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      // Mi perfil
      {
        path: 'mi-perfil',
        canActivate: [AuthGuard],
        data: { expectedRol: '/dashboard' },
        component: MyProfileComponent
      },
      // #region Dashboard - Pagina de inicio
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: './features/dashboard/dashboard.module#DashboardModule',
        data: { expectedRol: '/dashboard' },
      },

      // #endregion Dashboard - Pagina de inicio

      //Administrador de encuestas de satisfacción
      {
        path: 'admEncuestas',
        canActivate: [AuthGuard],
        loadChildren: 'src/app/features/administracion-encuestas/administracion-encuestas.module#AdministracionEncuestasModule',
        data: { expectedRol: '/empresas' },
      },
      //#region Eventos
      {
        path: 'eventos',
        canActivate: [AuthGuard],
        loadChildren: './features/eventos/eventos.module#EventosModule',
        data: { expectedRol: '/eventos' }
      },
      // Administración de capacitaciones
      {
        path: 'capacitaciones',
        canActivate: [AuthGuard],
        loadChildren: './features/capacitaciones/capacitaciones.module#CapacitacionesModule',
        data: { expectedRol: '/capacitaciones' },
      },
      // Toma de capacitaciones
      {
        path: 'audienciaCapacitaciones',
        canActivate: [AuthGuard],
        loadChildren: './features/audiencia-capacitaciones/audiencia-capacitaciones.module#AudienciaCapacitacionesModule',
        data: { expectedRol: '/audienciaCapacitaciones' },
      },
      //#region Administración de paginas de contenido
      {
        path: 'administracion-portal',
        canActivate: [AuthGuard],
        data: { expectedRol: '/administracion-portal' },
        loadChildren: './features/administracion-pagina-contenido/administracion-pagina-contenido.module#AdministracionPaginaContenidoModule',
      },
      //#endregion Administración de paginas de contenido
      //#region Catálogos
      {
        path: 'catalogos',
        canActivate: [AuthGuard],
        loadChildren: './features/catalogos/catalogos.module#CatalogosModule',
        data: { expectedRol: '/catalogos' },
      },
      //#endregion Catálogos
      //#region Solicitudes
      {
        path: 'solicitudes',
        canActivate: [AuthGuard],
        loadChildren: './features/solicitudes/solicitudes.module#SolicitudesModule',
        data: { expectedRol: '/solicitudes' },
      },
      //#endregion Solicitudes
      //#region Proyectos
      {
        path: 'proyectos',
        canActivate: [AuthGuard],
        data: { expectedRol: '/proyectos', titulo: 'Seguimiento a proyectos', empresaid: '0' },
        loadChildren: './features/proyectos/proyectos.module#ProyectosModule'
      },
      {
        path: 'DSP',
        canActivate: [AuthGuard],
        data: { expectedRol: '/DSP', titulo: 'Seguimiento de trámites administrativos', empresaid: '1' },
        loadChildren: './features/proyectos/proyectos.module#ProyectosModule'
      },
      {
        path: 'Mesas',
        canActivate: [AuthGuard],
        data: { expectedRol: '/Mesas', titulo: 'Mesas de negocio', empresaid: '0' },
        loadChildren: './features/proyectos/proyectos.module#ProyectosModule'
      },

      {
        path: 'pipeline',
        canActivate: [AuthGuard],
        redirectTo: '/proyectos/pipeline',
        pathMatch: 'full'
      },

      //#region Meetings
      {
        path: 'meetings',
        canActivate: [AuthGuard],
        loadChildren: './features/meetings/meetings.module#MeetingsModule',
        data: { expectedRol: '/meetings' },
      },
      //#endregion Meetings
      //#region Perfiles
      {
        path: 'perfiles',
        canActivate: [AuthGuard],
        loadChildren: './features/profiles/profiles.module#ProfilesModule',
        data: { expectedRol: '/perfiles' },
      },
      //#endregion Perfiles
      //#region Usuarios
      {
        path: 'usuarios',
        canActivate: [AuthGuard],
        loadChildren: './features/users/users.module#UsersModule',
        data: { expectedRol: '/usuarios' },
      },
      //#endregion Usuarios
      //#region Empresas
      {
        path: 'empresas',
        canActivate: [AuthGuard],
        loadChildren: './features/enterprises/enterprises.module#EnterprisesModule',
        data: { expectedRol: '/empresas' },
      },
      {
        path: 'tareas',
        canActivate: [AuthGuard],
        loadChildren: './features/tasks/tasks.module#TasksModule',
        data: { expectedRol: '/tareas' },
      },
      {
        path:'exploradores',
        canActivate: [AuthGuard],
        loadChildren: './features/explorers/explorers.module#ExplorersModule',
        data: { expectedRol: '/exploradores' },
      },
      {
        path: 'plantillas',
        canActivate: [AuthGuard],
        loadChildren: './features/plantillas/plantillas.module#PlantillasModule',
        data: { expectedRol: '/tareas' }
      },
      {
        path: 'promocionDigital',
        canActivate: [AuthGuard],
        loadChildren: './features/promocion-digital/promocion-digital.module#PromocionDigitalModule',
        data: { expectedRol: '/promocionDigital' }
      },
      //#endregion Empresas
      //#region Agenda
      {
        path: 'agenda',
        canActivate: [AuthGuard],
        loadChildren: './features/agenda/agenda.module#AgendaModule',
        data: { expectedRol: '/agenda' }
      },
      //#endregion Agenda
      //#region Logs
      {
        path: 'logs',
        canActivate: [AuthGuard],
        loadChildren: './features/logs/logs.module#LogsModule',
        data: { expectedRol: '/logs' },
      },
      //#endregion Logs
      {
        path: 'minutas',
        canActivate: [AuthGuard],
        loadChildren: './features/minutas/minutas.module#MinutasModule',
        data: { expectedRol: '/minutas' },
      },
      {
        path: 'sistema',
        loadChildren: './features/system/system.module#SystemModule',
        //data: { expectedRol: '/' },
      },
    ]
  },
  {
    path: '**',
    redirectTo: (localStorage.getItem('session')) ? '/dashboard' : '/inicio',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true}),
    // RouterModule.forRoot(routes, { useHash: false }),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule { }
