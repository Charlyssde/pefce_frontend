import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstitutionalLoginComponent } from './pages/institutional-login/institutional-login.component';
import { LoginComponent } from './pages/login/login.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';
import { RegistrationComponent } from './pages/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'login', component: LoginComponent  },
      { path: 'login-institucional', component: InstitutionalLoginComponent  },
      { path: 'registrar-empresa', component: RegistrationComponent },
      { path: 'recuperar-acceso', component: PasswordRecoveryComponent  }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
