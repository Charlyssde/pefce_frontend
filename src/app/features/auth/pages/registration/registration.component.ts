import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alerts } from 'src/app/core/utils/alerts';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  
})
export class RegistrationComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private alerts: Alerts
  ){}

  ngOnInit(): void {
    
  }

  onClickLogo(): void{
    this.router.navigate(['/inicio']);
  }

  onSubmitRegistration(enterprise){
    this.authService.enterpriseRegistration({"empresa":enterprise}).subscribe((response)=>{
        if(response){
          this.alerts.printSnackbar(15,null,null,"¡Empresa registrada!",5,true,"/auth/login",null);
        }
      }, (error)=>{
        this.alerts.printSnackbar(15,null,null,error.error,5,false,null,null);
      });
  }
}
