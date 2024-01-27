import { Component, OnInit } from '@angular/core';
import { ProyectosService } from '../../services/proyectos.service';
import { ProjectRequest } from 'src/app/core/utils/requests/projects/project.request';
import { Alerts } from 'src/app/core/utils/alerts';

@Component({
  selector: 'app-proyectos-create',
  templateUrl: './proyectos-create.component.html',
  styleUrls: ['./proyectos-create.component.css']
})
export class ProyectosCreateComponent implements OnInit {

  constructor(
    private projectsService: ProyectosService,
    private alerts: Alerts
  ) { }

  ngOnInit(): void {}

  async getProjectRequest(projectRequest: ProjectRequest) {
    this.projectsService.create(projectRequest).subscribe((response) => {
      if(response){
        this.alerts.printSnackbar(15,null,null,"Proyecto guardado",5,true,'/proyectos',null);
      }
    },(error) => {
      this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
    });
  }
}
