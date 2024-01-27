import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreAuthService } from '../../services/core-auth.service';
import { Alerts } from '../../utils/alerts';

@Component({
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent implements OnInit {

  public userSession: any = null;
  public menuOptions: any = [];

  constructor(
    public router: Router,
    public coreAuthService: CoreAuthService,
    public auth: CoreAuthService,
    public alerts: Alerts
  ) { }

  ngOnInit() {
    this.userSession = this.coreAuthService.getUserSessionData();
    this.menuOptions = this.userSession.roles;
    this.menuOptions.sort((a, b) => (a.nombreEtiqueta > b.nombreEtiqueta) ? 1 : -1);
    let quitarModulos = ['/contactos','/ferias','/seguimiento','/solicitudes-page','/solicitudesAGC','/solicitudGva','/logsChat','/rolesUsuario'];//mediante urlModulo se quita u oculta modulos
    this.menuOptions = this.menuOptions.filter((item) => !quitarModulos.includes(item.urlModulo))
  }

  onClickLogo(): void{
    this.router.navigate(["/dashboard"]);
  }

  async onClickLogout(){
    await this.auth.logout().subscribe(response => {
      if(response){
        localStorage.removeItem('token');
        localStorage.removeItem('sesion');
        localStorage.clear();
        setTimeout(() => { this.router.navigate([""]); }, 1000);
      }
    },(error)=>{
      this.alerts.printErrorSnackBar(error);
    });
  }
}
