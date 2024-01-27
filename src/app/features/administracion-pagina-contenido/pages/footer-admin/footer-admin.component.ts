import { environment } from '@env/environment';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { AdministracionWebService } from './../../services/administracion-web.service';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.css']
})
export class FooterAdminComponent implements OnInit, AfterViewInit {
  filesEndpoint: String = environment.apiUrl+'/files/getUrl?pathfile=';
  data: any = {
    "map": {
      "lat": 19.5175475,
      "lng": -96.8817107
    },
    "phone": "01 (228) 841-8500",
    "switch": "01 800 570 3255",
    "address": "Blvd. Cristóbal Colón No. 5 - 1406 Fraccionamiento Jardines de las Ánimas, 91190, Xalapa Enríquez, Veracruz",
    "url_skype": null,
    "url_twitter": "https://twitter.com/sedecopver/status/859089425489199104?lang=es",
    "url_facebook": "https://www.facebook.com/SEDECOPVer",
    "url_linkedin": null,
    "url_instagram": null
  };

  labels: any = null;
  labelsTemplate: any = {
    "lbl_capsules_title":"Capsulas",
    "lbl_rs": "Redes sociales",
    "lbl_hoy": "Indicadores Plataforma Electrónica para el Fomento al Comercio Exterior, la Atracción de Inversiones y los Proyectos Estratégicos",
    "lbl_atinv": "Atracción de inversiones",
    "lbl_login": "Ingresar",
    "lbl_phone": "Teléfono",
    "lbl_comext": "Comercio exterior",
    "lbl_inicio": "Inicio",
    "lbl_proest": "Proyectos estratégicos",
    "lbl_switch": "Conmutador, Lada nacional sin costo",
    "lbl_address": "Domicilio",
    "lbl_contact": "Medios de contacto",
    "lbl_eventos": "Eventos coordinados",
    "lbl_sitemap": "Mapa del sitio",
    "lbl_empresas": "Empresas registradas",
    "lbl_dm_source": "Fuente",
    "lbl_proyectos": "Proyectos registrados",
    "lbl_dm_compint": "Compras internacionales",
    "lbl_dm_desempl": "Tasa de desempleo",
    "lbl_dm_econcom": "Complejidad económica (ECI)",
    "lbl_dm_invextr": "Inversión extranjera directa",
    "lbl_dm_ventint": "Ventas internacionales",
    "lbl_dm_inforlab": "Tasa de informalidad laboral",
    "lbl_dm_ing_corr": "Ingreso corriente promedio trimestral",
    "lbl_dm_pobecact": "Población económicamente activa",
    "lbl_dm_poblacion": "Población",
    "lbl_capacitaciones": "Capacitaciones impartidas",
    "lbl_target_title": "Comercialización de productos y servicios de forma virtual",
    "lbl_target_content": "Ha surgido la necesidad de realizar ferias virtuales, exposiciones y mesas de negociación que coadyuve a diversificar las operaciones de exportación y fomentar el interés en los empresarios veracruzanos que aún no exportan, de ser partícipes en el comercio exterior, al que los altos costos de participación en pabellones internacionales es un obstáculo."
  };

  languages: any = null;

  multimedia: any = {};
  oldPathfile: any = {};

  capsules: any = [];
  capsuleTemplate: any = {
    "pathfile": null,
    "titulo": null,
    "categoria": null,
    "nuevo": 1
  };
  oldCapsule: any = [];

  categorias: any = [];

  constructor(
    private haService: AdministracionWebService,
    private cService: CatalogoService,
    private lib: ScriptsGlobalService,
    private appC: AppComponent
  ) { }

  ngOnInit() {
    this.appC.cargandoTexto = "Cargando";
    this.categorias = this.lib.categorias;
  }
  ngAfterViewInit(){
    this.getContent();
  }

  getContent() {
    this.haService.getContent('footer').subscribe((resp) => {
      if (resp) {
        this.data = resp.contenido.data;
        this.multimedia = resp.contenido.multimedia;
        this.capsules = resp.contenido.capsulas;
        this.getLanguages(resp.contenido.lang);
        this.getMultimedia();
        this.getCapsules();
      }
      else {
        this.lib.printSnackbar(15, null, null, "No hay datos para mostrar", 5, false, null, null);
      }
    }, (error) => {
      this.lib.printSnackbar(15, null, null, "Error de servidor", 5, false, null, null);
    });
  }

  getMultimedia() {
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val].pathfile = this.filesEndpoint+this.multimedia[val].pathfile;
      this.oldPathfile[val] = null;
    });
  }

  getCapsules() {
    if(this.capsules.length > 0){
      this.oldCapsule = JSON.parse(JSON.stringify(this.capsules));

      this.capsules.forEach((val, i) => {
        this.capsules[i].pathfile = this.filesEndpoint+this.capsules[i].pathfile;
        this.capsules[i]['nuevo'] = 0;
        this.oldCapsule[i].pathfile = null;
        this.oldCapsule[i]['nuevo'] = 0;
      });
    }
    else{
      this.capsules.push(JSON.parse(JSON.stringify(this.capsuleTemplate)));
      this.oldCapsule.push(JSON.parse(JSON.stringify(this.capsuleTemplate)));
    }
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

    let arrMimes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const inputNode: any = document.getElementById('inputLogotipo_' + key);
    let metadata = inputNode.files[0];

    if (arrMimes.indexOf(metadata.type) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.readAsDataURL(inputNode.files[0]);
        reader.onload = (e: any) => {
          this.appC.cargando = false;
          this.oldPathfile[key] = this.multimedia[key].pathfile;
          this.multimedia[key].pathfile = e.target.result;
        }
        reader.onerror = (e: any) => {
          this.appC.cargando = false;
          this.lib.printSnackbar(15,null,null,"El archivo no corresponde a un formato de imagen compatible (image/png, image/jpg, image/jpeg, image/gif)",5,false,null,null);
        };
      }
      else {
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, "No es posible leer el archivo desde este dispositivo", 5, false, null, null);
      }
    }
    else {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "El archivo no corresponde a un formato de imagen", 5, false, null, null);
    }
  }
  cancelChangeFile(key: string) {
    this.multimedia[key].pathfile = this.oldPathfile[key];
    this.oldPathfile[key] = null;
    const inputNode: any = document.getElementById('inputLogotipo_' + key);
    inputNode.value = '';
  }
  uploadFile(key: string) {
    this.appC.cargando = true;
    const inputNode: any = document.getElementById('inputLogotipo_' + key);
    let
      file: File = inputNode.files[0],
      splitFileName: String[] = (file.name).split('.'),
      extension: String = splitFileName[splitFileName.length -1 ],
      formData: FormData = new FormData(),
      headers = new Headers(),
      strPath = (this.oldPathfile[key]).split("?pathfile=")[1];

    formData.append("pathfile", strPath);
    formData.append("file", file);
    headers.append("Content-Type", "multipart/formdata");
    headers.append("Accept", "application/json");

    this.haService.updateFile(formData, headers).subscribe((resp) => {
      this.haService.getFileUrl(resp).subscribe((url) => {
        this.appC.cargando = false;
        this.multimedia[key]['pathfile'] = this.filesEndpoint+strPath;
        this.oldPathfile[key] = null;
        this.lib.printSnackbar(15, null, null, "Imagen actualizada exitosamente", 5, false, null, null);
      }, (error) => {
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar la imagen en el servidor", 5, false, null, null);
      });
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar la imagen en el servidor", 5, false, null, null);
    });
  }


  validateVideoRow(key: number) {
    let
      pathfile = this.capsules[key].pathfile !== null && (this.capsules[key].pathfile).includes('/footer/capsules/'),
      title = this.capsules[key].titulo === null || this.capsules[key].titulo === '',
      category = this.capsules[key].categoria === null;

    return (!pathfile || title || category);
  }
  changeVideo(key: number) {
    this.appC.cargando = true;

    let arrMimes = ['video/mp4','video/ogg','video/webm'];
    const inputNode: any = document.getElementById('inputVideo_' + key);
    let metadata = inputNode.files[0];

    if (arrMimes.indexOf(metadata.type) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.readAsDataURL(inputNode.files[0]);
        reader.onload = (e: any) => {
          this.oldCapsule[key].pathfile = this.capsules[key].nuevo == 1 ? '-' : this.capsules[key].pathfile;
          this.capsules[key].pathfile = e.target.result;
          this.appC.cargando = false;
        }
        reader.onerror = (e: any) => {
          this.appC.cargando = false;
          this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar leer el archivo", 5, false, null, null);
        };
      }
      else {
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, "No es posible leer el archivo desde este dispositivo", 5, false, null, null);
      }
    }
    else {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "El archivo no corresponde a un formato de video compatible (video/mp4, video/ogg, video/webm)", 5, false, null, null);
    }
  }
  cancelChangeVideo(key: number) {
    this.capsules[key].pathfile = this.capsules[key].nuevo == 1 ? null : this.oldCapsule[key].pathfile;
    this.oldCapsule[key].pathfile = null;
    const inputNode: any = document.getElementById('inputVideo_' + key);
    inputNode.value = '';
  }
  uploadVideo(key: number) {
    this.appC.cargando = true;
    const inputNode: any = document.getElementById('inputVideo_' + key);
    let
      file: File = inputNode.files[0],
      formData: FormData = new FormData(),
      headers = new Headers(),
      filename: string = "portal/footer/capsules/" + file.name;

    formData.append("pathfile", filename);
    formData.append("file", file);
    headers.append("Content-Type", "multipart/formdata");
    headers.append("Accept", "application/json");

    this.haService.updateFile(formData, headers).subscribe((resp) => {
      this.haService.getFileUrl(resp).subscribe((epUrl) => {
        this.capsules[key]['pathfile'] = this.filesEndpoint+filename;
        this.oldCapsule[key].pathfile = null;
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, "Cápsula actualizada exitosamente", 5, false, null, null);
      }, (error) => {
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar la cápsula en el servidor", 5, false, null, null);
      });
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar la cápsula en el servidor", 5, false, null, null);
    });
  }
  newVideoRow(){
    this.capsules.push(JSON.parse(JSON.stringify(this.capsuleTemplate)));
    this.oldCapsule.push(JSON.parse(JSON.stringify(this.capsuleTemplate)));
  }
  deleteVideoRow(key: number){
    if((this.capsules).length > 1){
      if(this.capsules[key].nuevo===1){
        (this.capsules).splice(key,1);
      }
      else{
        this.appC.cargando = true;
        let data = JSON.parse(JSON.stringify(this.capsules[key]));
        let strPath = (data.pathfile).split("?pathfile=")[1];
        this.haService.deleteFile(strPath).subscribe((resp)=>{
          (this.capsules).splice(key,1);
          this.saveData(null);
        },(error)=>{
          this.appC.cargando = false;
          this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar eliminar la cápsula en el servidor", 5, false, null, null);
        });
      }
    }
    else{
      this.lib.printSnackbar(15, null, null, "No es posible eliminar esta fila", 5, false, null, null);
    }
  }



  saveData(section: string) {
    this.appC.cargando = true;
    let objFiles = JSON.parse(JSON.stringify(this.multimedia));
    Object.keys(objFiles).map((key) => {
      let strPath = (objFiles[key].pathfile).split("?pathfile=")[1];
      objFiles[key].pathfile = strPath;
    });

    let arrCapsulas = JSON.parse(JSON.stringify(this.capsules));
    arrCapsulas.forEach((val, i) => {
      if(! this.validateVideoRow(i)){
        let strPath = (arrCapsulas[i].pathfile).split("?pathfile=")[1];
        arrCapsulas[i].pathfile = strPath;
        delete arrCapsulas[i]['nuevo'];
      }
      else{
        arrCapsulas.splice(i,1);
      }
    });

    let params = {
      "data": this.data,
      "lang": this.labels,
      "multimedia": objFiles,
      "capsulas": arrCapsulas
    };

    this.haService.updateContent('footer', params).subscribe((resp) => {
      this.appC.cargando = false;
      let respuesta = "Actualización exitosa";
      this.lib.printSnackbar(15, null, null, respuesta, 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar la información en el servidor", 5, false, null, null);
    });
  }
}
