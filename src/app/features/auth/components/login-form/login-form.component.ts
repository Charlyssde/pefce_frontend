import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Alerts } from 'src/app/core/utils/alerts';
import { LoginRequest } from 'src/app/core/utils/requests/auth/login-request.model';
import { AuthService } from '../../services/auth.service';
import { PrivacyAndPolicyComponent } from '../privacy-and-policy/privacy-and-policy.component';
import { SeleccionarPerfilComponent } from '../seleccionar-perfil/seleccionar-perfil.component';

@Component({
  selector: 'auth-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  formLogin: FormGroup;
  isFormValid: boolean = false;
  sessionData: any = {
    idSesion: null,
    idUsuario: null,
    nombre: null,
    roles: null,
    emailUsuario: null,
    perfil: null
  };

  @Input() accessType: string = "";

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alerts: Alerts,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      portal: [this.accessType]
    });
  }

  async onSubmitForm() {
    if (this.formLogin.valid) {
      let loginData: LoginRequest = this.formLogin.getRawValue();
      await this.authService.login(loginData).subscribe(async (response) => {
        if (response) {
          if (localStorage.getItem('session') != null) {
            localStorage.removeItem('token');
            localStorage.removeItem('sesion');
            localStorage.clear();
          }
          const dataUser = response;

          if (!dataUser.sesionActiva) {
            if (dataUser.perfiles.length > 1) {
              const dialogRef = this.dialog.open(SeleccionarPerfilComponent, {
                width: '350px',
                data: { perfiles: dataUser.perfiles, selectedPerfil: null },
              });
              this.sessionData.perfil = await dialogRef.afterClosed().toPromise();
              this.sessionData.roles = this.sessionData.perfil.permisos;
              await this.authService.setLoggedProfile(dataUser.logsSesion.id,this.sessionData.perfil.id).toPromise();
            } else {
              this.sessionData.perfil = dataUser.perfiles[0];
              this.sessionData.roles = dataUser.perfiles[0].permisos;
            }

            (this.sessionData.roles).forEach((role, index) => {
              if(role.subModulos != null){
                let subModulesSorted = (role.subModulos).sort((a,b) => a.nombreEtiqueta.localeCompare(b.nombreEtiqueta));
                this.sessionData.roles[index].subModulos = subModulesSorted;
              }
            });
            localStorage.setItem('token', response.token);
            localStorage.setItem('id', dataUser.id);
            localStorage.setItem('name', dataUser.nombre);
            localStorage.setItem('email', loginData.email);
            this.sessionData.idUsuario = dataUser.id;
            this.sessionData.nombre = dataUser.nombre;
            this.sessionData.idSesion = dataUser.logsSesion.id;
            this.sessionData.emailUsuario = loginData.email;
            localStorage.setItem('session', btoa(unescape(encodeURIComponent(JSON.stringify(this.sessionData)))));
            setTimeout(() => {
              if( dataUser.perfiles[0].nombre == "Empresa" ){
                this.router.navigate(["/exploradores"]);
              }else{
                this.router.navigate(["/dashboard"]);
              }
              
            },500);
          }
        }
      }, (error) => {
        this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
      });
    }
    else {
      this.alerts.printSnackbar(15, null, null, "Debes completar correctamente el formulario", 10, false, null, null);
    }
  }

  onClickLogo() {
    this.router.navigate(['']);
  }

  onClickPrivacyTerms() {
    this.dialog.open(PrivacyAndPolicyComponent, {
      width: '80%',
      height: '90vh',
      data: {},
    });
  }

}
