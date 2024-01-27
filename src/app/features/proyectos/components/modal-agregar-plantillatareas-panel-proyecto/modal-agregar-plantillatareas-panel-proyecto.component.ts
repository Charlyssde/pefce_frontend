import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { ProyectosPlantillaModel } from 'src/app/core/models/proyectos/proyectos_plantilla-model';
import { PlantillasService } from 'src/app/features/plantillas/service/plantillas.service';
import { ProyectosService } from '../../services/proyectos.service';


@Component({
  selector: 'app-modal-agregar-plantillatareas-panel-proyecto',
  templateUrl: './modal-agregar-plantillatareas-panel-proyecto.component.html',
  styleUrls: ['./modal-agregar-plantillatareas-panel-proyecto.component.css']
})

export class ModalAgregarPlantillatareasPanelProyectoComponent implements OnInit {
  
  listaPlantillas: ProyectosPlantillaModel[] = [];
  listaPlantillas_filtro: ProyectosPlantillaModel[] = [];

  proyecto: ProyectosModel = new ProyectosModel();
  usuarioCreador: number = null;
  proyectoPlantilla: ProyectosPlantillaModel = new ProyectosPlantillaModel();

  constructor(
    public dialogRef: MatDialogRef<ModalAgregarPlantillatareasPanelProyectoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private plantillasService: PlantillasService,
    private proyectosService: ProyectosService
  ) {
    this.proyecto = this.data.proyecto;
    this.usuarioCreador = this.data.usuarioSesion;
   }
 
  ngOnInit() {
    this.getPlantillas();
  }

  async getPlantillas() {
    await this.plantillasService.page().subscribe(plantillas => {
      if (plantillas) {
        this.listaPlantillas = plantillas;
        this.listaPlantillas_filtro = JSON.parse(JSON.stringify(this.listaPlantillas));
      }
    }, error => {

    });
  }


  onKey(value) {
    this.listaPlantillas_filtro = JSON.parse(JSON.stringify(this.listaPlantillas));
    this.selectSearch(value);
  }
  
  selectSearch(value:string){
    let filtro = value.toLowerCase();
    if(value !== null || value !== ""){
      let arrFiltrar = JSON.parse(JSON.stringify(this.listaPlantillas));
      let arrFiltrado = arrFiltrar.filter(u => (u.nombreCompleto.toLowerCase()).includes(filtro) );
      this.listaPlantillas_filtro = arrFiltrado;
    }
  }

  async createPlantillaTareasProyecto(){    
    /*       
    await this.proyectosService.createPlantillaTareasByProyecto(this.proyecto.id, this.usuarioCreador, this.proyectoPlantilla.id['id'] ).subscribe(proyectoPlantillas => {
      this.closeModal();
    });
    */

    this.dialogRef.close( this.proyectoPlantilla.id["tareas"] );    
    
  }
  closeModal(): void {
    this.dialogRef.close(null);
  }

}



