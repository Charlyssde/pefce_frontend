import { RouterModule, Routes } from "@angular/router";
import { DspComponent } from "./dsp.component";
import { NgModule } from "@angular/core";
import { DspNuevoComponent } from "./dsp-nuevo/dsp-nuevo.component";
import { DspEditComponent } from "./dsp-edit/dsp-edit.component";

const routes: Routes = [
  {
    path: "",
    data: { title: "DSP" },
    children: [
      {
        path: '',
        component: DspComponent,
        data: {title:'Proyectos', breadcrumb:[{label:'',url:'/proyectos'}]}
      },
      { 
        path: 'nuevo', 
        component: DspNuevoComponent ,
        data: {title:'Proyectos', breadcrumb:[{label:'',url:'/proyectos'},{label:'nuevo',url:''}]}
      },
      { 
        path: ':idDsp/editar', 
        component: DspEditComponent ,
        data: {title:'Proyectos', breadcrumb:[{label:'',url:'/proyectos'},{label:'{{idProyecto}}',url:''},{label:'editar',url:''}]}
      }
    ]
  },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DspRoutingModule { }
