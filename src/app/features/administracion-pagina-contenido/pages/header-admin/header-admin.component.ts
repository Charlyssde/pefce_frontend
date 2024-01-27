import { environment } from '@env/environment';
import { ScriptsGlobalService } from './../../../../common/scripts-global.service';
import { AdministracionWebService } from './../../services/administracion-web.service';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit, AfterViewInit {
  filesEndpoint: String = environment.apiUrl+'/files/getUrl?pathfile=';
  data: any = {
    "txt_mail": null,
    "txt_phone": null,
    "url_twitter": null,
    "url_facebook": null,
    "url_instagram": null,
    "url_skype": null,
    "url_linkedin": null
  };

  labels: any = null;
  labelsTemplate: any = {
    "lbl_inicio": "Inicio",
    "lbl_atinv": "Atracción de inversiones",
    "lbl_comext": "Comercio exterior",
    "lbl_proest": "Proyectos estratégicos",
    "lbl_login": "Ingresar"
  };

  languages: any = null;

  multimedia: any = {};
  oldPathfile:any = {};

  constructor(
    private haService: AdministracionWebService,
    private cService: CatalogoService,
    private lib: ScriptsGlobalService,
    private appC: AppComponent
  ) { }

  ngOnInit() {
    this.appC.cargandoTexto = "Cargando";
    this.appC.cargando = true;
  }

  ngAfterViewInit(){
    this.appC.cargandoTexto = "Cargando";
    this.appC.cargando = true;
    this.getContent();
  }

  getContent() {
    this.haService.getContent('header').subscribe((resp) => {
      if (resp) {
        this.data = resp.contenido.data;
        this.multimedia = resp.contenido.multimedia;
        this.getLanguages(resp.contenido.lang);
        this.getMultimedia();
        this.appC.cargando = false;
      }
      else {
        this.lib.printSnackbar(15, null, null, "No hay datos para mostrar", 5, false, null, null);
        this.appC.cargando = false;
      }
    }, (error) => {
      this.lib.printSnackbar(15, null, null, "Error de servidor", 5, false, null, null);
      this.appC.cargando = false;
    });
  }

  getMultimedia() {
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val]['pathfile'] = this.filesEndpoint+this.multimedia[val].pathfile;
      this.oldPathfile[val] = null;
    });
  }

  getLanguages(dataLang: any) {
    this.cService.readIdiomas().subscribe((resp) => {
      if (resp.length > 0) {
        this.languages = resp;
        let objLang = {};
        resp.forEach((val, i) => { objLang[val.tag] = this.labelsTemplate; });

        Object.keys(objLang).map((key) => {
          objLang[key] = (dataLang.hasOwnProperty(key)) ? dataLang[key] : dataLang['es'];
        });
        this.labels = objLang;
      }
    }, (error) => { });
  }


  changeFile(key: string) {
    this.appC.cargando = true;

    let arrMimes = ['image/png','image/jpg','image/jpeg','image/gif'];
    const inputNode: any = document.getElementById('inputLogotipo'+key);
    let metadata = inputNode.files[0];

    if(arrMimes.indexOf(metadata.type) > -1){
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.readAsDataURL(inputNode.files[0]);
        reader.onload = (e: any) => {
          this.oldPathfile[key] = this.multimedia[key].pathfile;
          this.multimedia[key]['pathfile'] = e.target.result;
          this.appC.cargando = false;
        }
        reader.onerror = (e:any)=>{
          this.appC.cargando = false;
          this.lib.printSnackbar(15,null,null,"Ocurrió un error al intentar leer el archivo",5,false,null,null);
        };
      }
      else{
        this.appC.cargando = false;
        this.lib.printSnackbar(15,null,null,"No es posible leer el archivo desde este dispositivo",5,false,null,null);
      }
    }
    else{
      this.appC.cargando = false;
      this.lib.printSnackbar(15,null,null,"El archivo no corresponde a un formato de imagen compatible (image/png, image/jpg, image/jpeg, image/gif)",5,false,null,null);
    }

  }
  cancelChangeFile(key: string){
    this.multimedia[key].pathfile = this.oldPathfile[key];
    this.oldPathfile[key] = null;
    const inputNode: any = document.getElementById('inputLogotipo'+key);
    inputNode.value='';
  }
  uploadFile(key: string){
    this.appC.cargando = true;
    const inputNode: any = document.getElementById('inputLogotipo'+key);
    let
      file: File = inputNode.files[0],
      splitFileName: String[] = (file.name).split('.'),
      extension: String = splitFileName[splitFileName.length -1 ],
      formData: FormData = new FormData(),
      headers = new Headers();

    formData.append("pathfile",'portal/header/veracruz_c.'+extension);
    formData.append("file",file);
    headers.append("Content-Type","multipart/formdata");
    headers.append("Accept","application/json");

    this.haService.updateFile(formData,headers).subscribe((resp)=>{
      this.appC.cargando = false;
      this.oldPathfile[key] = null;
      this.multimedia[key]['pathfile'] = this.filesEndpoint+'portal/header/veracruz_c.'+extension;
      this.lib.printSnackbar(15,null,null,"Imagen actualizada exitosamente",5,false,null,null);
    },(error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15,null,null,"Ocurrió un error al intentar actualizar la imagen en el servidor",5,false,null,null);
    });
  }


  saveData(section: string){
    this.appC.cargando = true;
    let objFiles = JSON.parse(JSON.stringify(this.multimedia));
    Object.keys(objFiles).map((key) => {
      let strPath = (objFiles[key].pathfile).split("?pathfile=")[1];
      objFiles[key].pathfile = strPath;
    });

    let params = {
      "data":this.data,
      "lang":this.labels,
      "multimedia":objFiles
    };

    this.haService.updateContent('header',params).subscribe((resp) => {
      this.appC.cargando = false;
      let respuesta = "Actualización exitosa";
      this.lib.printSnackbar(15,null,null,respuesta,5,false,null,null);
    },(error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15,null,null,"Ocurrió un error al intentar actualizar la información en el servidor",5,false,null,null);
    });
  }
}
