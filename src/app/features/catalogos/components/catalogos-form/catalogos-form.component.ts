import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { Alerts } from 'src/app/core/utils/alerts';

@Component({
  selector: 'app-catalogos-form',
  templateUrl: './catalogos-form.component.html',
  styleUrls: ['./catalogos-form.component.css']
})
export class CatalogosFormComponent implements OnInit {
  formCatalogo: FormGroup;
  descripcion: string;
  catalogo: CatalogoModel = new CatalogoModel();

  constructor(
    public dialogRef: MatDialogRef<CatalogosFormComponent>,
    private alerts: Alerts,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formCatalogo = this.formBuilder.group({
      id: [],
      tipoCatalogo: [this.data.tableSettings.type,[Validators.required]],
      nombre: ['',[Validators.required]],
      activo: [true,[Validators.required]],
      createdAt: [new Date(),[Validators.required]],
      updatedAt: [null],
      idCatalogoPadre: [null],
    });
    if(this.data.action === 'Editar'){
      this.formCatalogo.patchValue(this.data.dataset);
      if(this.data.tableSettings.headers.length > 1){
        this.formCatalogo.controls['nombre'].setValue(this.data.dataset.nombre.split('-')[0]);
        this.descripcion = this.data.dataset.nombre.split('-')[1];
      }
    }
  }

  onSubmitForm():void{
    if(this.formCatalogo.valid){
      let formDataset = this.formCatalogo.getRawValue();
      this.catalogo.id = formDataset.id ? formDataset.id : null;
      this.catalogo.nombre = (this.data.tableSettings.headers.length > 1) ? formDataset.nombre+'-'+this.descripcion : formDataset.nombre;
      this.catalogo.tipoCatalogo = formDataset.tipoCatalogo;
      this.catalogo.activo = true;
      this.catalogo.createdAt = (this.data.action === 'Editar') ? formDataset.createdAt : new Date();
      this.catalogo.updatedAt = (this.data.action === 'Editar') ? new Date() : null;
      this.catalogo.idCatalogoPadre = formDataset.idCatalogoPadre;
      this.dialogRef.close({event:'submit',catalogo:this.catalogo});
    }
    else{
      this.alerts.printSnackbar(15,null,null,"El formulario debe ser completado",5,false,null,null);
    }
  }
}
