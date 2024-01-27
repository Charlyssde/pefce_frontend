import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { InstitutionalLoginComponent } from './pages/institutional-login/institutional-login.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MaterialModule } from 'src/app/core/material/material.module';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { MyProfileComponent } from './pages/my-profile/my-profile.component';
import { PrivacyAndPolicyComponent } from './components/privacy-and-policy/privacy-and-policy.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SeleccionarPerfilComponent } from './components/seleccionar-perfil/seleccionar-perfil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddressComponent } from 'src/app/shared/components/address/address.component';
import { FormContactsComponent } from 'src/app/shared/components/enterprise/form-contacts/form-contacts.component';
import { FormEnterprisesComponent } from 'src/app/shared/components/enterprise/form-enterprises/form-enterprises.component';
import { PasswordRecoveryComponent } from './pages/password-recovery/password-recovery.component';


@NgModule({
  declarations: [
    PasswordRecoveryComponent,
    InstitutionalLoginComponent,
    LoginComponent,
    RegistrationComponent,
    MyProfileComponent,
    PrivacyAndPolicyComponent,
    LoginFormComponent,
    SeleccionarPerfilComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    FullCalendarModule,
    MaterialModule,
    AuthRoutingModule,
  ],
  entryComponents:[
    PrivacyAndPolicyComponent,
    LoginFormComponent,
    SeleccionarPerfilComponent,
    AddressComponent,
    FormContactsComponent,
    FormEnterprisesComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AuthModule { }
