import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/core/material/material.module';
import { PlantillaComponent } from './plantilla/plantilla.component';
import { CreatePlantillaComponent } from './create-plantilla/create-plantilla.component';
import { UpdatePlantillaComponent } from './update-plantilla/update-plantilla.component';
import { FormPlantillaComponent } from './form-plantilla/form-plantilla.component';
import { PagePlantillaComponent } from './page-plantilla/page-plantilla.component';

import { PlantillasRoutingModule } from './plantillas-routing.module';

@NgModule({
  declarations: [
    PlantillaComponent,
    CreatePlantillaComponent,
    UpdatePlantillaComponent,
    FormPlantillaComponent,
    PagePlantillaComponent
  ],
  imports: [
    CommonModule,
    PlantillasRoutingModule,
    MaterialModule,
  ]
})
export class PlantillasModule { }
