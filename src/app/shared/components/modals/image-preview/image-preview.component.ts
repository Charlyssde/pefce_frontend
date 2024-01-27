import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Data } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  image: string;
  
  constructor(
    public dialogRef: MatDialogRef<ImagePreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.image = (data.image.includes('base64') ? data.image : this.setURI(data.image));
  }

  setURI(pathfile: string) : string{    
    let now: string = new Date().toISOString();
    return environment.apiUrl+"/files/getUrl?pathfile="+pathfile+"&"+now;
  }

  ngOnInit() {
  }

}
