import { OnChanges, SimpleChanges } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomicilioModel } from 'src/app/core/models/shared/domicilio.model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';

@Component({
  selector: 'component-form-contacts',
  templateUrl: './form-contacts.component.html',
  styleUrls: ['./form-contacts.component.css']
})
export class FormContactsComponent implements OnInit, OnChanges {
  @Input() contactIn: UsuarioModel
  @Output() contactOut = new EventEmitter<any>();
  formContact: FormGroup;
  contact: UsuarioModel = new UsuarioModel();
  address: DomicilioModel = new DomicilioModel();

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.formContact = this.formBuilder.group({
      id:[''],
      nombre:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      telefono:['',[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern(/^[1-9]\d{9}$/)]],
      sexo:[null],
      recibirPublicidad: [true],
      domicilios:['',[Validators.required]],
    });
   }

  ngOnChanges(changes: SimpleChanges){
    if(changes.contactIn.currentValue){
      if(this.contactIn.id != null){
        this.formContact.patchValue(this.contactIn);
        this.address = this.contactIn.domicilios[0];
        this.addContactData();
      }
    }
  }

  ngOnInit() {

  }

  updateContactAddressData(domicilio: DomicilioModel){
    let domicilios = [];
    domicilios.push(domicilio);
    this.formContact.controls['domicilios'].setValue(domicilios);
    this.addContactData();
  }

  addContactData(): void{        
    this.contact = this.formContact.getRawValue();
    this.contact.estatus = true;
    this.contact.createdAt = new Date();
    this.contact.updatedAt = null;
    if ( this.formContact.controls['email'].valid && this.formContact.controls['telefono'].valid  && this.formContact.controls['nombre'].valid ){
      this.contactOut.emit(this.contact);
    }
    
  }
}
