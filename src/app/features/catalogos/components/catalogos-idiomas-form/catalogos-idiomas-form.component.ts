import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CatalogoModel } from 'src/app/core/models/catalogos/catalogo-model';
import { IdiomaModel } from 'src/app/core/models/idiomas/idioma-model';
import { Alerts } from 'src/app/core/utils/alerts';

@Component({
  selector: 'app-catalogos-idiomas-form',
  templateUrl: './catalogos-idiomas-form.component.html',
  styleUrls: ['./catalogos-idiomas-form.component.css']
})
export class CatalogosIdiomasFormComponent implements OnInit {

  formCatalogo: FormGroup;
  descripcion: string;
  idioma: IdiomaModel = new IdiomaModel();

  constructor(
    public dialogRef: MatDialogRef<CatalogosIdiomasFormComponent>,
    private alerts: Alerts,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.formCatalogo = this.formBuilder.group({
      id: [],
      idioma: ['', [Validators.required]],
      tag: ['', [Validators.required]],
      activo: [true, [Validators.required]],
      translationObject: [''],
      createdAt: [new Date(), [Validators.required]],
      updatedAt: [null],
    });
    if (this.data.action === 'Editar') {
      this.formCatalogo.patchValue(this.data.dataset);
    }
  }

  onSubmitForm(): void {
    if (this.formCatalogo.valid) {
      let formDataset = this.formCatalogo.getRawValue();
      this.idioma.id = formDataset.id ? formDataset.id : null;
      this.idioma.idioma = formDataset.idioma;
      this.idioma.tag = formDataset.tag;
      this.idioma.activo = true;
      this.idioma.translationObject = formDataset.translationObject;
      this.idioma.createdAt = (this.data.action === 'Editar') ? formDataset.createdAt : new Date();
      this.idioma.updatedAt = (this.data.action === 'Editar') ? new Date() : null;
      this.dialogRef.close({ event: 'submit', idioma: this.idioma });
    }
    else {
      this.alerts.printSnackbar(15, null, null, "El formulario debe ser completado", 5, false, null, null);
    }
  }

}
