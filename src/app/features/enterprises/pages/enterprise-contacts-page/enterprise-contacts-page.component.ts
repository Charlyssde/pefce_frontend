import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { EmpresaModel } from 'src/app/core/models/empresas/empresa.model';
import { UsuarioModel } from 'src/app/core/models/usuarios/usuario.model';
import { Alerts } from 'src/app/core/utils/alerts';
import { HelpBottomSheetComponent } from 'src/app/shared/components/bottom-sheets/help-bottom-sheet/help-bottom-sheet.component';
import { DeleteModalComponent } from 'src/app/shared/components/modals/delete-modal/delete-modal.component';
import { EnterprisesService } from '../../services/enterprises.service';

@Component({
  selector: 'app-enterprise-contacts-page',
  templateUrl: './enterprise-contacts-page.component.html',
  styleUrls: ['./enterprise-contacts-page.component.css']
})
export class EnterpriseContactsPageComponent implements OnInit {

  helpsSettings: any = {
    'module_name': 'Listado de contactos de empresa',
    'description': 'Módulo encargado de gestionar los contactos de una empresa',
    'details': [
      { 'detail': 'Nuevo registro (<span class="material-symbols-outlined">add</span>)', 'description': 'Mostrar formulario para un nuevo registro' },
      { 'detail': 'Editar registro (<span class="material-symbols-outlined">edit</span>)', 'description': 'Mostrar formulario para editar un registro existente' },
      { 'detail': 'Eliminar registro (<span class="material-symbols-outlined">delete</span>)', 'description': 'Mostrar ventana de confirmación de eliminación de un registro existente' },
      { 'detail': 'Inactivar/Activar registro (<span class="material-symbols-outlined">change_circle</span>)', 'description': 'Cambia el estatus del registro de activo a inactivo y viceversa' }
    ]
  };

  enterprise: EmpresaModel = new EmpresaModel();
  dataset: UsuarioModel[];
  enterpriseId: number;
  
  principal: string;
  changePrincipal: boolean = false;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private enterprisesService: EnterprisesService,
    private alerts: Alerts
  ) { }

  ngOnInit() {
    this.enterpriseId = parseInt(this.activatedRoute.snapshot.paramMap.get('empresaId'));
    this.findEnterprise();
  }

  showHelpSection(): void {
    this.bottomSheet.open(HelpBottomSheetComponent, { data: this.helpsSettings });
  }

  savePrincipalContact(){
    let contact = this.dataset.find(contact => contact.email === this.principal);
    this.enterprisesService.changePrincipalContact(this.enterpriseId, contact).subscribe((response) => {
      if(response){
        this.enterprise = response;
        this.dataset = response.contactos;
        this.principal = this.enterprise.email;
        this.alerts.printSnackbar(15,null,null,"¡Se ha actualizado el contacto principal!",5,false,null,null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  async findEnterprise(){
    await this.enterprisesService.findById(this.enterpriseId).subscribe((response) => {
      if(response){
        this.enterprise = response;
        this.dataset = response.contactos;
        this.principal = this.enterprise.email;
      }
    }, (error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }

  onClickDelete(user: any) {
    let data = {};
    data['id'] = user.id;
    data['title'] = "Eliminar contacto " + user.nombre;
    data['content'] = "¿Realmente desea eliminar al contacto <b>" + user.nombre + "</b> de los registros de la plataforma?";
    data['alerts'] = "Al eliminar a este contacto, toda su actividad dentro de la plataforma será eliminada y estas acciones son irreversibles.";
    this.dialog.open(DeleteModalComponent, {
      width: '70vw',
      data: data
    }).afterClosed().subscribe((result) => {
      if(result !== undefined && result !== ""){
        this.enterprisesService.deleteEnterpriseContact(this.enterpriseId,result).subscribe((response) => {
          this.alerts.printSnackbar(15, null, null, "Contacto eliminado", 5, false, null, null);
          this.findEnterprise();
        }, (error) => {
          this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
        });
      }
    });
  }

  async switchRegistrationStatus(contactId: number, status: boolean, index: number) {
    await this.enterprisesService.updateStatusUser(this.enterpriseId,contactId, status).subscribe((response) => {
      if (response) {
        this.dataset[index] = response;
        this.alerts.printSnackbar(15, null, null, "Estatus actualizado", 5, false, null, null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }

  onClickPasswordRecovery(contact: any){
    let passwordRecoveryData = { email: contact.email };
    this.enterprisesService.passwordRecovery(this.enterpriseId, contact.id,passwordRecoveryData).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15, null, null, "Se ha enviado la nueva contraseña al contacto "+contact.nombre +" con correo electrónico "+contact.email, 5, false, null, null);
      }
    }, (error) => {
      this.alerts.printSnackbar(15, null, null, error.error, 5, false, null, null);
    });
  }

}
