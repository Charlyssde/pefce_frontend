import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CatalogoService } from 'src/app/common/catalogos.service';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';

@Component({
  selector: 'app-modal-registro-eventos',
  templateUrl: './modal-registro-eventos.component.html',
  styleUrls: ['./modal-registro-eventos.component.css']
})
export class ModalRegistroEventosComponent implements OnInit {

  public form: FormGroup ;
  municipioPrev: CatalogoModel = new CatalogoModel();
    municipios: Array<CatalogoModel> = new Array<CatalogoModel>();

  constructor(private fb : FormBuilder,
    public dialogRef: MatDialogRef<ModalRegistroEventosComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private CatalogoService: CatalogoService,
    ) { 
      this.getMunicipios(30);
    this.form = fb.group({
      males : new FormControl('', Validators.required),
      females : new FormControl('',Validators.required),
      municipio : new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async getMunicipios(id: number) {
    await this.CatalogoService.getCatalogosId('municipiosEstado', id).subscribe(data => {
      this.municipios = data;
      this.municipios.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    });
  }

  public onSubmitForm(){
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
    }
  }

}
