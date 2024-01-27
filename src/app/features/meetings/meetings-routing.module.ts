import { MeetingsUpdateComponent } from './pages/meetings-update/meetings-update.component';
import { MeetingsCreateComponent } from './pages/meetings-create/meetings-create.component';
import { MeetingsCuentaPageComponent } from './pages/meetings-cuenta-page/meetings-cuenta-page.component';
import { MeetingsAdministradorUpdateComponent } from './pages/meetings-administrador-update/meetings-administrador-update.component';
import { MeetingsAdministradorCreateComponent } from './pages/meetings-administrador-create/meetings-administrador-create.component';
import { MeetingsAdministradorPageComponent } from './pages/meetings-administrador-page/meetings-administrador-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    children: [
      { path:'', redirectTo: '/meetings/cuentas', pathMatch: 'full'  },
      { path: 'cuentas',component: MeetingsAdministradorPageComponent },
      { path: 'cuentas/nuevo',component: MeetingsAdministradorCreateComponent },
      { path: 'cuentas/editar/:idCuentaMeeting', component: MeetingsAdministradorUpdateComponent },
      { path: 'cuentas/:idCuentaMeeting/zoom', component: MeetingsCuentaPageComponent },
      { path: 'cuentas/:idCuentaMeeting/zoom/nuevo', component: MeetingsCreateComponent },
      { path: 'cuentas/:idCuentaMeeting/zoom/editar/:idMeeting', component: MeetingsUpdateComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingsRoutingModule { }
