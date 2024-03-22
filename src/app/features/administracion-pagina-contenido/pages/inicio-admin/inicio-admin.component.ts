import {environment} from '@env/environment';
import {Component, OnInit} from '@angular/core';
import {AppComponent} from 'src/app/app.component';
import {ScriptsGlobalService} from 'src/app/common/scripts-global.service';
import {CatalogoService} from 'src/app/features/catalogos/services/catalogo.service';
import {AdministracionWebService} from './../../services/administracion-web.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css']
})
export class InicioAdminComponent implements OnInit {
  filesEndpoint: String = environment.apiUrl + '/files/getUrl?pathfile=';

  data: any = {};

  labels: any = {};
  labelsTemplate: any = {
    'lbl_slogan': 'Trabajando por un veracruz industrial',
    'lbl_pefce': 'Plataforma electrónica para el fomento al comercio exterior, la atracción de inversiones y los proyectos estratégicos',
    'lbl_pefce_desc': 'El objetivo de esta plataforma es promover al comercio exterior y fomentar la atracción de inversiones al Estado de Veracruz mediante la difusión de nuestras fortalezas así como el impulso a los proyectos estratégicos, entre ellos, el Programa de Desarrollo del Istmo de Tehuantepec magnificando el alcance mediante el uso de tecnologías de la información.',
    'lbl_pefce_title1': 'Atracción de inversiones',
    'lbl_pefce_content1': 'Texto demostrativo 1',
    'lbl_pefce_title2': 'Comercio exterior',
    'lbl_pefce_content2': 'Texto demostrativo',
    'lbl_pefce_title3': 'Proyectos estratégicos',
    'lbl_pefce_content3': 'Texto demostrativo',
    'lbl_pefce_url': 'Ir a sección',
    'lbl_target_title': 'Comercialización de productos y servicios de forma virtual',
    'lbl_target_content': 'Ha surgido la necesidad de realizar ferias virtuales, exposiciones y mesas de negociación que coadyuve a diversificar las operaciones de exportación y fomentar el interés en los empresarios veracruzanos que aún no exportan, de ser partícipes en el comercio exterior, al que los altos costos de participación en pabellones internacionales es un obstáculo.'
  };

  languages: any = null;

  multimedia: any = {};
  oldPathfile: any = {};

  videos: any = {};
  oldVideofile: any = {};

  initialContent: any = {};
  dictionaryLanguage: any = {
    es: 'Español',
    en: 'Inglés',
    fr: 'Francés'
  };

  spanishContent: any;
  englishContent: any;
  frenchContent: any;

  constructor(
    private haService: AdministracionWebService,
    private cService: CatalogoService,
    private lib: ScriptsGlobalService,
    private appC: AppComponent
  ) {
  }

  ngOnInit() {
    this.appC.cargandoTexto = 'Cargando';
    this.appC.cargando = true;
  }

  ngAfterViewInit() {
    this.getContent();
  }

  getContent() {
    this.haService.getContent('inicio').subscribe((resp) => {
      if (resp) {
        this.data = resp.contenido.data;
        this.multimedia = resp.contenido.multimedia;
        this.videos = resp.contenido.videos;
        this.initialContent = JSON.parse(JSON.stringify(resp.contenido.lang));
        this.getLanguages(resp.contenido.lang);
        this.getMultimedia();
        this.getVideos();
        this.appC.cargando = false;
      } else {
        this.lib.printSnackbar(15, null, null, 'No hay datos para mostrar', 5, false, null, null);
        this.appC.cargando = false;
      }
    }, (error) => {
      this.lib.printSnackbar(15, null, null, 'Error de servidor', 5, false, null, null);
      this.appC.cargando = false;
    });
  }

  getMultimedia() {
    Object.keys(this.multimedia).forEach((val) => {
      this.multimedia[val].pathfile = this.filesEndpoint + this.multimedia[val].pathfile;
      this.oldPathfile[val] = null;
    });
  }

  getVideos() {
    Object.keys(this.videos).forEach((val) => {
      this.videos[val].pathfile = this.filesEndpoint + this.videos[val].pathfile;
      this.oldVideofile[val] = null;
    });
  }

  findByTag(tag: string, data: any[] = null) {
    const lang = data.find((val: any) => val.tag === tag);
    return {
      tag: lang.tag,
      translationObject: JSON.parse(lang.translationObject)
    };
  }

  getLanguages(dataLang: any) {
    this.cService.readIdiomas().subscribe((resp) => {
      this.spanishContent = this.findByTag('es', resp);
      this.englishContent = this.findByTag('en', resp);
      this.frenchContent = this.findByTag('fr', resp);

      if (resp.length > 0) {
        this.languages = resp;
        let objLang = {};
        resp.forEach((val, i) => {
          objLang[val.tag] = this.labelsTemplate;
        });
        Object.keys(objLang).map((key) => {
          objLang[key] = (dataLang.hasOwnProperty(key)) ? dataLang[key] : dataLang['es'];
        });
        this.labels = objLang;
      }
    }, (error) => {
    });
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
          this.multimedia[key]['pathfile'] = e.target.result;
        };
        reader.onerror = (e: any) => {
          this.appC.cargando = false;
          this.lib.printSnackbar(15, null, null, 'El archivo no corresponde a un formato de imagen compatible (image/png, image/jpg, image/jpeg, image/gif)', 5, false, null, null);
        };
      } else {
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, 'No es posible leer el archivo desde este dispositivo', 5, false, null, null);
      }
    } else {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, 'El archivo no corresponde a un formato de imagen', 5, false, null, null);
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
      extension: String = splitFileName[splitFileName.length - 1],
      formData: FormData = new FormData(),
      headers = new Headers(),
      strPath = 'portal/inicio/imagenes/' + key + '.' + extension;

    formData.append('pathfile', strPath);
    formData.append('file', file);
    headers.append('Content-Type', 'multipart/formdata');
    headers.append('Accept', 'application/json');

    this.haService.updateFile(formData, headers).subscribe((resp) => {
      this.appC.cargando = false;
      this.multimedia[key].pathfile = this.filesEndpoint + strPath;
      this.oldPathfile[key] = null;
      this.lib.printSnackbar(15, null, null, 'Imagen actualizada exitosamente', 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, 'Ocurrió un error al intentar actualizar la imagen en el servidor', 5, false, null, null);
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
        };
        reader.onerror = (e: any) => {
          this.appC.cargando = false;
          this.lib.printSnackbar(15, null, null, 'El archivo no corresponde a un formato de imagen compatible (video/mp4)', 5, false, null, null);
        };
      } else {
        this.appC.cargando = false;
        this.lib.printSnackbar(15, null, null, 'No es posible leer el archivo desde este dispositivo', 5, false, null, null);
      }
    } else {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, 'El archivo no corresponde a un formato de video', 5, false, null, null);
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
      extension: String = splitFileName[splitFileName.length - 1],
      formData: FormData = new FormData(),
      headers = new Headers(),
      strPath = 'portal/inicio/videos/' + key + '.' + extension;

    formData.append('pathfile', strPath);
    formData.append('file', file);
    headers.append('Content-Type', 'multipart/formdata');
    headers.append('Accept', 'application/json');

    this.haService.updateFile(formData, headers).subscribe((resp) => {
      this.appC.cargando = false;
      this.videos[key]['pathfile'] = this.filesEndpoint + strPath;
      this.oldVideofile[key] = null;
      this.lib.printSnackbar(15, null, null, 'Video actualizado exitosamente', 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, 'Ocurrió un error al intentar actualizar el video en el servidor', 5, false, null, null);
    });
  }

  saveData(section: string) {
    this.appC.cargando = true;
    let objFiles = JSON.parse(JSON.stringify(this.multimedia));
    Object.keys(objFiles).map((key) => {
      let strPath = (objFiles[key].pathfile).split('?pathfile=')[1];
      objFiles[key].pathfile = strPath;
    });

    let objVideos = JSON.parse(JSON.stringify(this.videos));
    Object.keys(objVideos).map((key) => {
      let strPath = (objVideos[key].pathfile).split('?pathfile=')[1];
      objVideos[key].pathfile = strPath;
    });


    let params = {
      'data': this.data,
      'lang': this.labels,
      'multimedia': objFiles,
      'videos': objVideos
    };

    this.appC.cargando = false;

    this.haService.updateContent('inicio', params).subscribe((resp) => {
      this.appC.cargando = false;
      let respuesta = 'Actualización exitosa';
      this.lib.printSnackbar(15, null, null, respuesta, 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, 'Ocurrió un error al intentar actualizar la información en el servidor', 5, false, null, null);
    });
  }

  saveContent(option: string) {
    this.appC.cargando = true;
    const toUpdate = this.languages.find((val: any) => val.tag === option);

    if (option === 'es') {
      toUpdate.translationObject = JSON.stringify(this.spanishContent.translationObject);
    }
    if (option === 'en') {
      toUpdate.translationObject = JSON.stringify(this.englishContent.translationObject);
    }
    if (option === 'fr') {
      toUpdate.translationObject = JSON.stringify(this.frenchContent.translationObject);
    }

    this.cService.putIdioma(toUpdate).subscribe((resp) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, 'Actualización exitosa', 5, false, null, null);
    }, (error) => {
      this.appC.cargando = false;
      this.lib.printSnackbar(15, null, null, 'Ocurrió un error al intentar actualizar la información en el servidor', 5, false, null, null);
    });
  }
}
