import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AtraccionInversionesComponent } from './pages/atraccion-inversiones/atraccion-inversiones.component';
import { ComercioExteriorComponent } from './pages/comercio-exterior/comercio-exterior.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ProyectosEstrategicosComponent } from './pages/proyectos-estrategicos/proyectos-estrategicos.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  {
    path:'',
    children: [
      { path: '', component: InicioComponent },
      { path: 'inicio', component: InicioComponent },
      { path: 'atraccionInversiones', component: AtraccionInversionesComponent },
      { path: 'comercioExterior', component: ComercioExteriorComponent },
      { path: 'proyectosEstrategicos', component: ProyectosEstrategicosComponent },
      { path: 'capacitaciones/validarQR/:token', component: InicioComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaContenidoRoutingModule { }
