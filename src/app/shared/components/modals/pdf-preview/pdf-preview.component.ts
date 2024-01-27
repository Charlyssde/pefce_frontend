import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '@env/environment';

@Component({
  selector: 'app-pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.css']
})
export class PdfPreviewComponent implements OnInit {

  pdf: string;
  titulo: string = null;
  
  constructor(
    public dialogRef: MatDialogRef<PdfPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.pdf = (data.pdf.includes('base64')) ? data.pdf : this.setURI(data.pdf);

    if( data.titulo ) {
      this.titulo = data.titulo;
    }
  }

  setURI(pathfile: string) : string{
    let now: string = new Date().toISOString();
    return environment.apiUrl+"/files/getUrl?pathfile="+pathfile+"&"+now;
  }

  ngOnInit() {
  }

}
