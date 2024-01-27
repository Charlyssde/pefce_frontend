import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalVerDetalleProyectoComponent } from '../../components/modal-ver-detalle-proyecto/modal-ver-detalle-proyecto.component';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { ProyectosService } from '../../services/proyectos.service';


@Component({
  selector: 'app-proyectos-pipeline',
  templateUrl: './proyectos-pipeline.component.html',
  styleUrls: ['./proyectos-pipeline.component.css']
})
export class ProyectosPipelineComponent implements OnInit {


  statuses = null;

  constructor(
    private CatalogoService: CatalogoService,
    private proyectosService: ProyectosService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getData();
  }

  getUserByRole(proyecto: any, role:number){
    return (proyecto.colaboradores).filter(u => u.rol === role)[0];
  }

  async getData(){
    this.CatalogoService.getAllByTipoCatalogo('ESTATUS_PROYECTOS').subscribe(data => {
      if (data.length > 0) {
        this.statuses = data;
        this.statuses.forEach(status => {
          this.proyectosService.findByStatusId(status.id).subscribe(data => {
            status.proyectos = data;
          });
        });
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      var newStatus = event.container.element.nativeElement.dataset.idstatus;
      var element = event.container.data[event.currentIndex];
      this.CatalogoService.findById(parseInt(newStatus)).subscribe(data => {
        element.tipoId = data;
        this.proyectosService.updateByPanel(element).subscribe(data => {

        });        
      });
    }
  }

  click(proyecto){
    const dialogRef = this.dialog.open(ModalVerDetalleProyectoComponent, {
      data: proyecto
    });
  }

}
