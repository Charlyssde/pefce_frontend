import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Alerts } from 'src/app/core/utils/alerts';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-contacts-update',
  templateUrl: './enterprise-contacts-update.component.html',
  styleUrls: ['./enterprise-contacts-update.component.css']
})
export class EnterpriseContactsUpdateComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Editar contacto de empresa',
    'description': 'Módulo encargado de editar un contacto perteneciente a una empresa..',
    'details': [
      { 'detail': 'Datos generales' , 'description' : 'En esta sección se registran los datos generales de un contacto, incluye su nombre, correo electrónico y teléfono.' }
    ]
  };

  enterpriseId: number;
  contactId: number;
  contact: UsuarioModel = new UsuarioModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.enterpriseId = parseInt(this.activatedRoute.snapshot.paramMap.get('empresaId'));
    this.contactId = parseInt(this.activatedRoute.snapshot.paramMap.get('contactoId'));
    this.getEnterpriseById();
  }

  async getEnterpriseById(){
    await this.enterprisesService.findById(this.enterpriseId).subscribe((response) => {
      if(response){
        this.contact = (response.contactos).find(contact => contact.id === this.contactId);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitContact(contact){
    this.enterprisesService.patchEnterpriseContact(this.enterpriseId,contact).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"¡Registro exitoso!",5,true,"/empresas/"+this.enterpriseId+"/contactos",null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  submitProduct(product){

  }
}
