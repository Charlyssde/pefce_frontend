import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';

@Component({
  selector: 'shared-help-bottom-sheet',
  templateUrl: './help-bottom-sheet.component.html',
  styleUrls: ['./help-bottom-sheet.component.css']
})
export class HelpBottomSheetComponent implements OnInit {
  @Input() helpArray;

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<HelpBottomSheetComponent>
  ) {
   }

  ngOnInit(){
    if(this.helpArray){

    }
  }

}
