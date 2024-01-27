import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { AreasEnum } from 'src/app/core/enums/areas.enum';
import { ProfileModel } from 'src/app/core/models/profiles/profiles.model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { CoreAuthService } from 'src/app/core/services/core-auth.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { UserRequest } from 'src/app/core/utils/requests/users/user.request';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {

  @Input() helpsSettings: number;
  @Input() userId: number;
  @Input() user: UsuarioModel;
  @Input() profilesList: ProfileModel[];

  @Output() userOut = new EventEmitter<any>();

  activeProfile: any = null;
  perfilesUsuario: ProfileModel[] = [];
  profiles: ProfileModel[] = [];
  profilesRequest: ProfileModel[] = [];

  formUser: FormGroup;
  areasList: any = AreasEnum;

  showPasswordInputs: boolean = false;
  repeatPasswordError: boolean = false;
  validPasswords: boolean = false;

  changePassword: boolean = false;
  firstPassword: string = "";
  secondPassword: string = "";

  constructor(
    private bottomSheet: MatBottomSheet,
    private alerts: Alerts,
    private formBuilder: FormBuilder,
    private coreAuthService: CoreAuthService
  ) {
    this.formUser = this.formBuilder.group({
      id: [null, []],
      nombre: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefono:[null,[Validators.maxLength(15)]],
      sexo:[null],
      recibirPublicidad:[true,[Validators.required]],
      estatus:[true,[Validators.required]],
      createdAt:[new Date(),[Validators.required]],
      updatedAt:[null]
    });
    this.activeProfile = this.coreAuthService.getUserSessionData().perfil;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.user.currentValue) {
      this.formUser.patchValue(this.user);
      this.perfilesUsuario = this.user.perfiles;
      this.prepareProfilesList();
    }
  }

  prepareProfilesList(){
    this.profiles = [];
    (this.profilesList).forEach((value) => {
      let profile = JSON.parse(JSON.stringify(value));
      profile['activo'] = false;
      if(this.userId > 0){
        if(this.perfilesUsuario.find(perfil => perfil.id == profile.id)){
          profile['activo'] = true;
        }
      }
      this.profiles.push(profile);
    });
    this.onChangeProfileCheckbox();
  }
  onChangeProfileCheckbox(){
    this.profilesRequest = [];
    let profiles = JSON.parse(JSON.stringify(this.profiles));
    profiles = profiles.filter(profile => profile.activo === true);
    profiles.forEach((value) => {
      delete value['activo'];
      this.profilesRequest.push(value);
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

  

  onSubmitForm() {
    this.onChangeProfileCheckbox();
    if (this.formUser.valid && this.profilesRequest.length > 0) {
      let userRequest: UserRequest = new UserRequest();
      userRequest.user = this.formUser.getRawValue();
      userRequest.user.createdAt = (this.userId>0)  ? userRequest.user.createdAt : new Date();
      userRequest.user.updatedAt = (this.userId>0)  ? new Date() : null;
      userRequest.user.estatus = true;
      userRequest.user.recibirPublicidad = true;

      userRequest.profiles = this.profilesRequest;

      userRequest.updatePassword = this.changePassword;
      userRequest.newPassword = this.firstPassword;
      userRequest.repeatPassword = this.secondPassword;

      this.userOut.emit(userRequest);
    }
    else {
      this.alerts.printSnackbar(15, null, null, "El formulario debe ser completado", 5, false, null, null);
    }
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent,{data:this.helpsSettings});
  }

}
