import { ActivatedRoute } from '@angular/router';
import { FormProyectosComponent } from './../../components/form-proyectos/form-proyectos.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ProyectosModel } from 'src/app/core/models/proyectos/proyectos-model';
import { ProyectosService } from '../../services/proyectos.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { ProjectRequest } from 'src/app/core/utils/requests/projects/project.request';

@Component({
  selector: 'app-proyectos-update',
  templateUrl: './proyectos-update.component.html',
  styleUrls: ['./proyectos-update.component.css']
})
export class ProyectosUpdateComponent implements OnInit {
  
  proyecto: ProyectosModel;
  idProyecto:number;

  constructor(
    private projectsService: ProyectosService,
    private alerts: Alerts,
    private activatedRouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idProyecto = parseInt(this.activatedRouter.snapshot.paramMap.get('idProyecto'));
  }

  async getProjectRequest(projectRequest: ProjectRequest) {
    this.projectsService.update(projectRequest, this.idProyecto).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"Proyecto guardado",5,true,'/proyectos',null);
      }
    },(error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }
}
