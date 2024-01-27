import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Utils } from 'src/app/core/utils/utils';

@Component({
  selector: 'shared-select-with-filter',
  templateUrl: './select-with-filter.component.html',
  styleUrls: ['./select-with-filter.component.css']
})
export class SelectWithFilterComponent implements OnInit, OnChanges {

  @Input() placeholder: string = "";
  @Input() appearance: string = "fill";
  @Input() keyName: string = "";
  @Input() optionsList: any = [];
  @Input() valueSetted: any = null;
  @Output() emitSelectedValue = new EventEmitter<any>();

  dynamicFilterInput: string = null;
  selectedValue: any = null;
  
  options: any = [];
  originalOptions: any = [];

  constructor(
    public utils: Utils
  ) {
   }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.optionsList && changes.optionsList.currentValue){
      this.options = this.optionsList;
      this.originalOptions = this.optionsList;
    }
    if(changes.valueSetted && changes.valueSetted.currentValue){
      this.selectedValue = this.valueSetted;
    }
  }

  onChangeDynamicFilterInput(){
    let options = this.originalOptions;
    if(this.dynamicFilterInput !== null || this.dynamicFilterInput !== ""){
      this.options = options.filter((option) => (option[this.keyName].toLowerCase()).includes((this.dynamicFilterInput).toLowerCase()));
    }
  }

  onChangeSelectedValue(){
    this.valueSetted = this.selectedValue;
    this.emitSelectedValue.emit(this.valueSetted);
  }

}
