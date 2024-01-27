import { Component, OnInit, Inject } from '@angular/core';
import { ExplorersService } from '../../services/explorers.service';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { ProyectosColaboradorModel } from 'src/app/core/models/proyectos/proyectos_colaborador-model';
import { ProjectRequest } from 'src/app/core/utils/requests/projects/project.request';
import { ProyectosService } from 'src/app/features/proyectos/services/proyectos.service';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { Alerts } from 'src/app/core/utils/alerts';

@Component({
  selector: 'app-modal-solicitar-mesa',
  templateUrl: './modal-solicitar-mesa.component.html',
  styleUrls: ['./modal-solicitar-mesa.component.css']
})
export class ModalSolicitarMesaComponent implements OnInit {

  formProject: FormGroup;
  userSession = null;
  comentario = "";
  enterpriseId: any;
  interesado:any;
  projectRequest = new ProjectRequest();
  tipoId: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ModalSolicitarMesaComponent>,
    public lib: ScriptsGlobalService,
    public explorersService: ExplorersService,
    private formBuilder: FormBuilder,
    private elRef: ElementRef,
    private proyectosService: ProyectosService,
    private catalogosService: CatalogoService,
    private alerts: Alerts,
  ) {
    this.userSession = this.lib.getUserSessionData();
    this.enterpriseId = data.enterpriseId;
    this.interesado = data.interesado;
  }

  ngOnInit() {
    this.getTipoProyecto();
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  async save(){

    this.formProject = this.formBuilder.group({
      id: [],
      folio: [],
      tipoId: [450],
      empresaId: [ this.enterpriseId ],
      nombre: ["Solicitud de mesa de negocio desde pabellón de empresas de el(la) C. " + this.enterpriseId.empresa + " con fecha: " + new Date()],
      descripcion: [this.elRef.nativeElement.querySelector('#comentario').value],
      prioridad: [null],
      fechaInicio: [new Date()],
      fechaFin: [new Date()],
      area: [null], //obtener responsable en back
      montoPrevisto: [null],
      empleosDirectos: [null],
      empleosIndirectos: [null],
      oficioTurno: [null],
      observaciones: [null],
      estatus: ['enProceso'],
      activo: [true,],
      createdAt: [new Date()],
      updatedAt: [new Date()],
      colaboradores: [[this.interesado]] //responsable obtener en back
    });

    let project = this.formProject.getRawValue();

    let responsable = new ProyectosColaboradorModel;
    responsable.usuarioId = null;
    responsable.rol = 'responsable';
    responsable.activo = true;
    responsable.createdAt = new Date();
    responsable.updatedAt = new Date();

    let interesado = new ProyectosColaboradorModel;
    interesado.usuarioId = this.interesado;
    interesado.rol = 'interesado';
    interesado.activo = true;
    interesado.createdAt = new Date();
    interesado.updatedAt = new Date();

    this.projectRequest.project = project;
    project.tipoId = this.tipoId;
    this.projectRequest.institutionResponsible = responsable;
    this.projectRequest.enterpriseResponsible = interesado;


    this.proyectosService.create( this.projectRequest).subscribe((response)=>{
      this.alerts.printSnackbar(15, null, null, "Se envío su solicitud para iniciar una mesa de negocios, espere confirmación por parte de personal de esta Secretaría!", 5, false, null, null);
      this.closeModal();
    });

  }

  async getTipoProyecto(){
    await this.catalogosService.getByTipoCatalogo("TIPO_MINUTA").subscribe((response) => {
      const item = response.find(response => response.id === 450);

      if (item) {
        this.tipoId = item;
      }

    });
  }

  

}
