import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { AppComponent } from 'src/app/app.component';
import { ScriptsGlobalService } from 'src/app/common/scripts-global.service';
import { CatalogoService } from 'src/app/features/catalogos/services/catalogo.service';
import { AdministracionWebService } from './../../services/administracion-web.service';

@Component({
  selector: 'app-comercio-exterior-admin',
  templateUrl: './comercio-exterior-admin.component.html',
  styleUrls: ['./comercio-exterior-admin.component.css']
})
export class ComercioExteriorAdminComponent implements OnInit {
  filesEndpoint: String = environment.apiUrl+'/files/getUrl?pathfile=';

  data: any = {};

  labels: any = {};
  labelsTemplate: any = {
    "lbl_1title": "Título",
    "lbl_2subtitle": "Subtítulo",
    "lbl_3description": "Descripción de la subárea"
  };

  languages: any = null;

  multimedia: any = {};
  oldPathfile: any = {};

  videos:any = {};
  oldVideofile: any = {};

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

  ngAfterViewInit() {
    this.getContent();
  }

  getContent() {
    this.haService.getContent('comercioExterior').subscribe((resp) => {
      if (resp) {
        this.data = resp.contenido.data;
        this.multimedia = resp.contenido.multimedia;
        this.videos = resp.contenido.videos;
        this.getLanguages(resp.contenido.lang);
        this.getMultimedia();
        this.getVideos();
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

  async getMultimedia() {
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val].pathfile = this.filesEndpoint+this.multimedia[val].pathfile;
      this.oldPathfile[val] = null;
    });
  }
  getVideos() {
    Object.keys(this.videos).forEach((val) => {
      this.videos[val].pathfile = this.filesEndpoint+this.videos[val].pathfile;
      this.oldVideofile[val] = null;
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

    let arrMimes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
    const inputNode: any = document.getElementById('imagen_' + key);
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
          this.lib.printSnackbar(15, null, null, "El archivo no corresponde a un formato de imagen compatible (image/png, image/jpg, image/jpeg, image/gif)", 5, false, null, null);
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
    const inputNode: any = document.getElementById('imagen_' + key);
    inputNode.value = '';
  }
  uploadFile(key: string) {
    this.appC.cargando = true;
    const inputNode: any = document.getElementById('imagen_' + key);
    let
      file: File = inputNode.files[0],
      splitFileName: String[] = (file.name).split('.'),
      extension: String = splitFileName[splitFileName.length -1 ],
      formData: FormData = new FormData(),
      headers = new Headers(),
      strPath = 'portal/comercioExterior/imagenes/' + key + '.'+extension;

    formData.append("pathfile", strPath);
    formData.append("file", file);
    headers.append("Content-Type", "multipart/formdata");
    headers.append("Accept", "application/json");

    this.haService.updateFile(formData, headers).subscribe((resp) => {
      this.appC.cargando = false;
      this.multimedia[key].pathfile = this.filesEndpoint+strPath;
      this.oldPathfile[key] = null;
      this.lib.printSnackbar(15, null, null, "Imagen actualizada exitosamente", 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar la imagen en el servidor", 5, false, null, null);
    });
  }

  changeVideo(key: string) {
    this.appC.cargando = true;

    let arrMimes = ['video/mp4'];
    const inputNode: any = document.getElementById('video_' + key);
    let metadata = inputNode.files[0];

    if (arrMimes.indexOf(metadata.type) > -1) {
      if (typeof (FileReader) !== 'undefined') {
        const reader = new FileReader();
        reader.readAsDataURL(inputNode.files[0]);
        reader.onload = (e: any) => {
          this.appC.cargando = false;
          this.oldVideofile[key] = this.videos[key].pathfile;
          this.videos[key].pathfile = e.target.result;
        }
        reader.onerror = (e: any) => {
          this.appC.cargando = false;
          this.lib.printSnackbar(15, null, null, "El archivo no corresponde a un formato de imagen compatible (video/mp4)", 5, false, null, null);
        };
      }
      else {
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, "No es posible leer el archivo desde este dispositivo", 5, false, null, null);
      }
    }
    else {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "El archivo no corresponde a un formato de video", 5, false, null, null);
    }
  }
  cancelChangeVideo(key: string) {
    this.videos[key].pathfile = this.oldVideofile[key];
    this.oldVideofile[key] = null;
    const inputNode: any = document.getElementById('video_' + key);
    inputNode.value = '';
  }
  uploadVideo(key: string) {
    this.appC.cargando = true;
    const inputNode: any = document.getElementById('video_' + key);
    let
      file: File = inputNode.files[0],
      splitFileName: String[] = (file.name).split('.'),
      extension: String = splitFileName[splitFileName.length -1 ],
      formData: FormData = new FormData(),
      headers = new Headers(),
      strPath = 'portal/comercioExterior/videos/' + key + '.'+extension;

    formData.append("pathfile", strPath);
    formData.append("file", file);
    headers.append("Content-Type", "multipart/formdata");
    headers.append("Accept", "application/json");

    this.haService.updateFile(formData, headers).subscribe((resp) => {
      this.appC.cargando = false;
      this.videos[key]['pathfile'] = this.filesEndpoint+strPath;
      this.oldVideofile[key] = null;
      this.lib.printSnackbar(15, null, null, "Video actualizado exitosamente", 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar el video en el servidor", 5, false, null, null);
    });
  }

  saveData(section: string) {
    this.appC.cargando = true;
    let objFiles = JSON.parse(JSON.stringify(this.multimedia));
    Object.keys(objFiles).map((key) => {
      let strPath = (objFiles[key].pathfile).split("?pathfile=")[1];
      objFiles[key].pathfile = strPath;
    });

    let objVideos = JSON.parse(JSON.stringify(this.videos));
    Object.keys(objVideos).map((key) => {
      let strPath = (objVideos[key].pathfile).split("?pathfile=")[1];
      objVideos[key].pathfile = strPath;
    });


    let params = {
      "data": this.data,
      "lang": this.labels,
      "multimedia": objFiles,
      "videos": objVideos
    };

    this.appC.cargando = false;

    this.haService.updateContent('comercioExterior', params).subscribe((resp) => {
      this.appC.cargando = false;
      let respuesta = "Actualización exitosa";
      this.lib.printSnackbar(15, null, null, respuesta, 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, "Ocurrió un error al intentar actualizar la información en el servidor", 5, false, null, null);
    });
  }
}
