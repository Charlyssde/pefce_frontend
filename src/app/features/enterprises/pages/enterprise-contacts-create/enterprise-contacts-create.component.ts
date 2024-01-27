import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Alerts } from 'src/app/core/utils/alerts';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-contacts-create',
  templateUrl: './enterprise-contacts-create.component.html',
  styleUrls: ['./enterprise-contacts-create.component.css']
})
export class EnterpriseContactsCreateComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Nuevo contacto de empresa',
    'description': 'Módulo encargado de registrar un nuevo contacto a una empresa..',
    'details': [
      { 'detail': 'Datos generales' , 'description' : 'En esta sección se registran los datos generales de un contacto, incluye su nombre, correo electrónico y teléfono.' }
    ]
  };

  enterpriseId: number;
  contactId = 0;
  contact: UsuarioModel = new UsuarioModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.enterpriseId = parseInt(this.activatedRoute.snapshot.paramMap.get('empresaId'));
  }

  submitContact(contact){
    this.enterprisesService.postEnterpriseContact(this.enterpriseId,contact).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"¡Registro exitoso!",5,true,"/empresas/"+this.enterpriseId+"/contactos",null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }
}
