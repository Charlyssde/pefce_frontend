import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomicilioModel } from 'src/app/core/models/shared/domicilio.model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { MyProfileRequest } from 'src/app/core/utils/requests/auth/my-profile-request.model';
import { PerfilModel } from 'src/app/core/models/perfil/perfil-model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  domicilio: DomicilioModel;

  showPasswordInputs: boolean = false;
  repeatPasswordError: boolean = false;
  validPasswords: boolean = false;

  formProfile: FormGroup;
  perfiles: PerfilModel[];

  changePassword: boolean = false;
  firstPassword: string = "";
  secondPassword: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private alerts:Alerts,
    private coreAuthService: CoreAuthService,
    private authService: AuthService

  ) { }

  ngOnInit() {    
    this.formProfile = this.formBuilder.group({
      id:[null,[Validators.required]],
      nombre:[null,[Validators.required]],
      email:[null,[Validators.required,Validators.email, Validators.pattern(/^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/)]],
      telefono:[null,[Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[1-9]\d{9}$/)]],
      sexo:[null,[Validators.required]],
      password:[null,[Validators.minLength(8)]],
      domicilios:[null],
      perfiles:[null,[Validators.required]],
      recibirPublicidad:[null,[Validators.required]],
      estatus:[null,[Validators.required]],
      createdAt:[null,[Validators.required]],
      updatedAt:[null]
    });
    this.getProfile();
  }
  
  async getProfile(){
    let userData = this.coreAuthService.getUserSessionData();
    await this.authService.getMyProfile(userData.idUsuario).subscribe((response) => {
      if(response){
        this.perfiles = response.perfiles;
        this.domicilio = response.domicilios.length > 0 ? response.domicilios[0] : null;
        this.perfiles.sort((a,b) => a.nombre.localeCompare(b.nombre));
        this.formProfile.patchValue(response);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,8,false,null,null);
    });
  }

  changePass(switchStatus: boolean): void{
    this.showPasswordInputs = switchStatus;
    this.firstPassword = "";
    this.secondPassword = "";
  }
  formValidPasswords() {
    this.repeatPasswordError = false;
    this.validPasswords = false;
    if(this.firstPassword.length >= 8 && this.secondPassword.length>=8 && this.secondPassword != this.firstPassword){
      this.repeatPasswordError = true;
    }
    if(this.firstPassword.length >= 8 && this.secondPassword.length>=8 && this.secondPassword == this.firstPassword){
      this.validPasswords = true;
    }
  };

  updateProfileAddressData(domicilio: DomicilioModel){
    let domicilios = [];
    domicilios.push(domicilio);
    this.formProfile.controls['domicilios'].setValue(domicilios);
  }

  onSubmit(): void{

    let myProfileRequest: MyProfileRequest = new MyProfileRequest();
    myProfileRequest.usuario = this.formProfile.getRawValue();
    myProfileRequest.actualizarPassword = this.changePassword;
    myProfileRequest.nuevaPassword = this.firstPassword;
    myProfileRequest.repetirPassword = this.secondPassword;
      
    this.authService.updateProfile(myProfileRequest).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"Perfil actualizado exitosamente",8,false,null,null);
      }
    },(error) => {
      this.alerts.printSnackbar(15,null,null,error.error,8,false,null,null);
    });
  }
}
