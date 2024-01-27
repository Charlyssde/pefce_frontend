import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'shared-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  constructor(
    private cdr: ChangeDetectorRef,
    public loaderService: LoaderService,

  ) { }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }
    
  ngOnInit() {
  }

}
