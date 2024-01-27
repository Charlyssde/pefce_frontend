import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '@env/environment';
import { ProductoModel } from 'src/app/core/models/empresas/producto.model';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { FileModel } from 'src/app/core/models/files/file.model';
import { createViewChild } from '@angular/compiler/src/core';

@Component({
  selector: 'app-enterprise-product-details',
  templateUrl: './enterprise-product-details.component.html',
  styleUrls: ['./enterprise-product-details.component.css']
})
export class EnterpriseProductDetailsComponent implements OnInit {

  product: ProductoModel;
  selectedVideo: FileModel;
  videoURI = null;
  
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  constructor(
    public dialogRef: MatDialogRef<EnterpriseProductDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { 
    this.product = data.product;
  }

  setURI(pathfile: string) : string{
    return environment.apiUrl+"/files/getUrl?pathfile="+pathfile;
  }

  ngOnInit() {
  }

  onSelectVideo(){
    this.videoURI = this.setURI(this.selectedVideo.url);
    setTimeout(() => {
      this.videoPlayer.nativeElement.pause();
      this.videoPlayer.nativeElement.play();
    }, 500);
  }

}
