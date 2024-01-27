import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomicilioModel } from 'src/app/core/models/shared/domicilio.model';
import { GeocodingService } from 'src/app/core/services/geocoding.service';

@Component({
  selector: 'shared-address-component',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnChanges {
  @Input() addressIn: DomicilioModel;
  @Output() addressOut = new EventEmitter<any>();
  formAddress: FormGroup;
  address: DomicilioModel = new DomicilioModel();

  inputZipcode: any = null;
  zipCodes: any[] = [];
  zipcodeSelectedOption: any;

  inputCounty: string = null;
  inputState: string = null;
  inputCountry: string = null;

  constructor(
    private formBuilder: FormBuilder,
    private geocodingService: GeocodingService
  ) { }

  ngOnInit() {
    this.formAddress = this.formBuilder.group({
      id:[],
      calle:[],
      colonia:[],
      codigoPostal:[],
      municipio: [],
      estado: [],
      pais: [],
      estatus: [],
      createdAt: [],
      updatedAt: []
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {

    if(changes.addressIn.currentValue){
      if(this.addressIn.id != null){
        this.formAddress.patchValue(this.addressIn);
        this.inputZipcode = this.addressIn.codigoPostal;
        this.geocodingOnKeypress();
        this.inputCounty = this.addressIn.municipio;
        this.inputState = this.addressIn.estado;
        this.inputCountry = this.addressIn.pais;
      }
    }
  }

  async geocodingOnKeypress(){
    if((this.inputZipcode).toString().length > 3){
      await this.geocodingService.geocodingByZipcode(this.inputZipcode).subscribe((response) => {
        this.zipCodes = response.features;
        if(this.addressIn){
          let index = this.zipCodes.findIndex(zipcode => ( (zipcode.text === this.inputZipcode) && (zipcode.place_name).includes(this.inputCounty)) );
          let zipcodebject = this.zipCodes[index];
          this.displayProperty(zipcodebject);
        }
      });
    }
  }
  displayProperty(zipcode): string{
    if(zipcode && typeof zipcode === 'object'){ return zipcode.text; }
    if(zipcode && typeof zipcode === 'string'){ return zipcode; }
    return;
  }
  selectedZipcodeOption(zipcodeFeature: any): void{
    this.displayProperty(zipcodeFeature);
    let context = zipcodeFeature.context;

    context.forEach((element) => {
      if((element.id).includes('place')){
        this.inputCounty = element.text;
      }
      if((element.id).includes('region')){
        this.inputState = element.text;
      }
      if((element.id).includes('country')){
        this.inputCountry = element.text;
      }
    });
  }



  addAddressData(): void{
    this.address = this.formAddress.getRawValue();
    this.address.codigoPostal = this.inputZipcode ? this.inputZipcode['text'] : null;
    this.address.municipio = this.inputCounty;
    this.address.estado = this.inputState;
    this.address.pais = this.inputCountry;
    this.address.estatus = true;
    this.address.createdAt = this.address.createdAt ? this.address.createdAt : new Date();
    this.address.updatedAt = new Date();
    this.addressOut.emit(this.address);
  }
}
