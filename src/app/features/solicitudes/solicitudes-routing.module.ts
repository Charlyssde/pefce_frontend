import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SolicitudesUpdateComponent } from './pages/solicitudes-update/solicitudes-update.component';
import { SolicitudesCreateComponent } from './pages/solicitudes-create/solicitudes-create.component';
import { SolicitudesPageComponent } from './pages/solicitudes-page/solicitudes-page.component';
import { AuthGuardService } from 'src/app/auth/service/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: SolicitudesPageComponent },
      { path: 'nuevo', component: SolicitudesCreateComponent },
      { path: 'editar/:idSolicitud', component: SolicitudesUpdateComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
