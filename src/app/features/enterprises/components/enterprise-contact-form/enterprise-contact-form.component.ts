import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { UserRequest } from 'src/app/core/utils/requests/users/user.request';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';

@Component({
  selector: 'app-enterprise-contact-form',
  templateUrl: './enterprise-contact-form.component.html',
  styleUrls: ['./enterprise-contact-form.component.css']
})
export class EnterpriseContactFormComponent implements OnInit {

  @Input() contactIn: UsuarioModel;
  @Input() contactId: number;
  @Input() helpsSettings: any;
  @Input() enterpriseIdIn: number;
  
  @Output() contactOut = new EventEmitter<any>();
  
  formContact: FormGroup;

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
  ) {
    this.formContact = this.formBuilder.group({
      id:[null],
      nombre:[null,[Validators.required]],
      email:[null,[Validators.required, Validators.email]],
      telefono:[null,[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[1-9]\d{9}$/)]],
      sexo:[null],
      recibirPublicidad: [true],
      domicilios:[null],
    });
   }

  ngOnChanges(changes: SimpleChanges){
    if(changes.contactIn.currentValue){
      if(this.contactIn.id != null){
        this.formContact.patchValue(this.contactIn);
      }
    }
  }

  ngOnInit() {
    
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent,{data:this.helpsSettings});
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
    if (this.formContact.valid) {
      let userRequest: UserRequest = new UserRequest();
      userRequest.user = this.formContact.getRawValue();
      userRequest.user.domicilios = (this.contactId > 0 ? userRequest.user.domicilios : []);
      userRequest.user.createdAt = (this.contactId > 0  ? this.contactIn.createdAt : new Date());
      userRequest.user.updatedAt = (this.contactId > 0  ? new Date() : null);
      userRequest.user.estatus = true;
      userRequest.user.recibirPublicidad = true;

      userRequest.profiles = (this.contactId > 0 ? this.contactIn.perfiles : []);

      userRequest.updatePassword = this.changePassword;
      userRequest.newPassword = this.firstPassword;
      userRequest.repeatPassword = this.secondPassword;

      this.contactOut.emit(userRequest);
    }
    else {
      this.alerts.printSnackbar(15, null, null, "El formulario debe ser completado", 5, false, null, null);
    }
  }
}
