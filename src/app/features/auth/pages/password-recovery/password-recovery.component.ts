import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/services/loader.service';
import { Alerts } from 'src/app/core/utils/alerts';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrls: ['./password-recovery.component.css']
})
export class PasswordRecoveryComponent implements OnInit {

  formPasswordRecovery: FormGroup;
  isFormValid: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private loaderService: LoaderService,
    private alerts: Alerts

  ) { }

  ngOnInit() {
    this.formPasswordRecovery = this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]]
    });
  }

  async onSubmitForm(){
    if(this.formPasswordRecovery.valid){
      let asswordRecoveryData = this.formPasswordRecovery.getRawValue();
      this.loaderService.setLoading(true);
      await this.authService.passwordRecovery(asswordRecoveryData).subscribe((response) => {
        if(response){
          this.alerts.printSnackbar(15,null,null,response.message,10,true,'/auth/login',null);
        }
      }, (error) => {
        this.alerts.printSnackbar(15,null,null,error.error,10,false,null,null);
      });
    }
    else{
      this.alerts.printSnackbar(15,null,null,"Debes completar correctamente el formulario",10,false,null,null);
    }
  }

  onClickLogo(){
    this.router.navigate(['']);
  }

}
