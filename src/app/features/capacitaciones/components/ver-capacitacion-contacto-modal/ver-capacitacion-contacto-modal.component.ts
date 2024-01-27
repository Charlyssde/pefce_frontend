import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';
import { ContactoModel } from 'src/app/core/models/contactos/contacto-model';
//import { ContactosService } from 'src/app/features/contactos/service/contactos.service';
import { CapacitacionesService } from 'src/app/features/capacitaciones/service/capacitaciones.service';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CapacitacionModel } from 'src/app/core/models/capacitaciones/capacitacion-model';
import { EmailService } from 'src/app/common/email.service';
import { UsersService } from 'src/app/features/users/services/users.service';

export interface DialogData {
  capacitacion: CapacitacionModel
}

@Component({
  selector: 'app-ver-capacitacion-contacto-modal',
  templateUrl: './ver-capacitacion-contacto-modal.component.html',
  styleUrls: ['./ver-capacitacion-contacto-modal.component.css']
})
export class VerCapacitacionContactoModalComponent implements OnInit {

  idCapacitacion = 0;
  isPage = false;
  isCreate = false;
  formulario: FormGroup;
  contactos: Array<ContactoModel> = new Array<ContactoModel>();
  contactosCapacitacion: Array<any> = new Array<any>();
  cargando = false;
  cargandoTexto = 'Enviando correos, por favor espere.';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    //private contactoService: ContactosService,
    private usuariosService: UsersService,
    private capacitacionService: CapacitacionesService,
    private scriptGL: ScriptsGlobalService,
    
    private emailService: EmailService
  ) { }




  ngOnInit() {
    this.idCapacitacion = this.data.capacitacion.id;
    this.isPage = true;
    this.formulario = this.fb.group({
      contacto: ['', Validators.required]
    });
  }


  async agregarContacto(){
    this.isPage = false;
    this.isCreate = true;
    await this.usuariosService.page().subscribe(data=>{
      if(data){
        this.contactos = data;
        this.contactos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
      }
    });
  }

  async guardar(){
    if(this.formulario.valid){
      const contacto = this.formulario.controls['contacto'].value;
      const existeContacto = this.contactosCapacitacion.find(contactoCapacitacion => contactoCapacitacion.usuario.id === contacto.id);
      if(!existeContacto){
        const dataSave = {
          usuario: contacto,
          capacitacion: this.data.capacitacion,
          fechaRegistro: new Date(),
          createdAt: new Date()
        };
        this.capacitacionService.createUsuarioCapacitacion(dataSave).subscribe(data => {
          if (data) {
            this.scriptGL.printGuardarSnackBar(data);
            this.isCreate = false;
            this.isPage = true;
            this.ngOnInit();
          } else {
            this.scriptGL.printSnackbar(12, null, null, null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
        });
        /*const capacitacion = this.data.capacitacion;
        const capacitacionContacto = {
          id: null,
          capacitacion: capacitacion,
          contacto: contacto
        };
        await this.capacitacionService.createCapacitacionContacto(capacitacionContacto).subscribe(async data=>{
          if(data){
            this.scriptGL.printGuardarSnackBar(data);
            this.isCreate = false;
            this.isPage = true;
            this.ngOnInit();
          } else {
            this.scriptGL.printSnackbar(1, null, null, null, 5, false, null, null);
          }
        }, error => {
          this.scriptGL.printErrorSnackBar(error);
        });*/
      } else {
        this.scriptGL.printSnackbar(15, 1, null, 'Este usuario ya se encuentra registrado en la capacitación, favor de seleccionar otro.', 2, false, null, null);
      }
    } else {
      this.scriptGL.printSnackbar(15, 1, null, 'Favor de seleccionar un contacto para agregar.', 2, false, null, null);
    }
  }

  setContactosCapacitacion(data){
    this.contactosCapacitacion = data;
  }

  async enviarCorreos(){
    this.cargando = true;
    let listaCorreos = [];
    for(let contactoCapacitacion of this.contactosCapacitacion){
      listaCorreos.push(contactoCapacitacion.usuario.correo)
    }
    if(listaCorreos.length > 0){
      await this.emailService.sendEmailWithDestinosAndMensajeToFrontEnd(listaCorreos, 'PEFCE - Recuperación de contraseña', this.mensajeCorreo()).subscribe(async data2=> {
        this.scriptGL.printSnackbar(15,null,null,'Se envió el(los) correo(s) con éxito.',5,false,null,null);
        this.cargando = false;
      });
      this.cargando = false;
    } else {
      this.scriptGL.printSnackbar(15, null, null, 'No hay un correo para enviar', 5, false, null, null);
      this.cargando = false;
    }
  }

  mensajeCorreo(){
    return "Estimado usuario:" +
    "\n\nEstás recibiendo este correo porque hiciste una solicitud de recuperación de contraseña para tu cuenta." +
    "\nA continuación le adjuntamos su contraseña temporal, favor de actualizarla después de acceder a la plataforma en el apartado 'Mi Perfil'.";
  }
}
