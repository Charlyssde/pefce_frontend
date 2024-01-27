// BASE
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { SesionModel } from '../core/models/session/sesion-model';

@Injectable({
  providedIn: 'root'
})
export class ScriptsGlobalService {
  // Variables privadas
  private baseUrl = environment.apiUrl;
  // Variables públicas
  monthObj: any = [
    { number: '01', val: 'ENE', month: "Enero" },
    { number: '02', val: 'FEB', month: "Febrero" },
    { number: '03', val: 'MAR', month: "Marzo" },
    { number: '04', val: 'ABR', month: "Abril" },
    { number: '05', val: 'MAY', month: "Mayo" },
    { number: '06', val: 'JUN', month: "Junio" },
    { number: '07', val: 'JUL', month: "Julio" },
    { number: '08', val: 'AGO', month: "Agosto" },
    { number: '09', val: 'SEP', month: "Septiembre" },
    { number: '10', val: 'OCT', month: "Octubre" },
    { number: '11', val: 'NOV', month: "Noviembre" },
    { number: '12', val: 'DIC', month: "Diciembre" },
  ];

  // SUBÁREAS
  eSubarea = {
    atraccionInversiones: "Atracción de inversiones",
    comercioExterior: "Comercio exterior",
    proyectosEstrategicos: "Proyectos estratégicos"
  };
  // TIPOS DE SOLICITUD
  eTiposSolicitud = {
    navesterrenos: "Naves y terrenos",
    intencion: "Intención de inversión",
    acompañamiento:"Acompañamiento"

  };
  // MODALIDAD DE EVENTOS
  eModalidadEvento = {
    presencial: "Evento presencial",
    virtual: "Evento virtual"
  };

  ePrivacidadEvento = {
    publico: "Evento público",
    privado: "Evento privado"
  };

  eEstatusEmpresaEvento = {
    enespera: "En espera",
    enrevision: "En revisión",
    aceptada: "Aceptada",
    rechazada: "Rechazada"
  };

  // Modelos internos
  logErrorModel = {
    id: null,
    error: null,
    fechaHora: null
  };

  logSesionModel = {
    id: null,
    idUsuario: null,
    fechaInicio: null,
    activo: null,
    fechaFin: null
  };

  logOperacionModel = {
    id: null,
    idUsuario: null,
    url: null,
    operacion: null,
    data: null,
    fechaHora: null
  };


  categorias: any = [
    {"id":1,"clave":"inicio","categoria":"Inicio"},
    {"id":2,"clave":"atraccionInversiones","categoria":"Atracción de inversiones"},
    {"id":2,"clave":"comercioExterior","categoria":"Comercio exterior"},
    {"id":3,"clave":"proyectosEstrategicos","categoria":"Proyectos estratégicos"}
  ];

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(DOCUMENT) document: any,
    private http: HttpClient
  ) { }



  //#region VALIDACIONES
  // Validar números
  validaNumeros(event) {
    return (event.charCode >= 48 && event.charCode <= 57) ? true : false;
  }

  // valida que el campo no sea vacio
  validaStringNoNulo(valor){
    return (valor != null && valor != '' && valor != undefined && valor != "") ? true : false ;
  }

  // valida objeto tenga valor y tenga id
  validaObjetoNoNuloWithId(valor){
    return valor && valor.id ? true : false;
  }

  // Validar números y punto .
  validaFloats(event) {
    return ((event.charCode >= 48 && event.charCode <= 57) || (event.charCode === 46)) ? true : false;
  }

  // Validar Iguales
  validaIguales(x: any, y: any) {
    return (x === y) ? true : false;
  }

  // Validar que una fecha (primer parámetro) sea anterior o igual a la otra (segundo parámetro)
  validaAnteriorOIgual(x: any, y: any) {
    x = new Date(x);
    y = new Date(y);
    return !(x && y && x > y);
  }

  // Comparar objeos
  objectComparisonFunction = function (option, value): boolean {
    if (value != null)
      return option.id === value.id;
  }

  // filtro de paginadores
  getDatosPorFiltro(arrayDatos: any, tipoFiltro: string, filtro: string, valorBusqueda: string){
    let resultadoBusqueda;
    if(tipoFiltro === 'string'){
      resultadoBusqueda = arrayDatos.filter(data => {
        if(!data[filtro]) return;
        if(this.isObject(filtro)) {
          const valueObject = this.resolveObject(data,filtro);
          return valueObject.toLowerCase().includes(valorBusqueda.trim().toLowerCase())
        }else {
          return data[filtro].toLowerCase().includes(valorBusqueda.trim().toLowerCase())
        }
      });
    } else if(tipoFiltro === 'number'){
      resultadoBusqueda = arrayDatos.filter(data => data[filtro].toString().toLowerCase().includes(valorBusqueda.trim()));
    }
    return resultadoBusqueda;
  }


  isObject(filtro: string) {
    if(!filtro) return false;
    if(filtro.split('.').length > 1) return true;
    return false;
  }


  resolveObject(value: any, filtro: string) {
    let aux = null;
    for (const iterator of filtro.split('.')) {
      if(!aux) {
        aux = value[iterator]
      }else {
        aux = value[iterator]
      }
    }
    return aux;
  }
  //#endregion VALIDACIONES
  //#region CONVERSIONES DE FECHAS
  // Transformar mes MM a mes MMM
  parseMMtoMMM(month: string) {
    let mmm = '';
    switch (month) {
      case '01': mmm = "ENE"; break;
      case '02': mmm = "FEB"; break;
      case '03': mmm = "MAR"; break;
      case '04': mmm = "ABR"; break;
      case '05': mmm = "MAY"; break;
      case '06': mmm = "JUN"; break;
      case '07': mmm = "JUL"; break;
      case '08': mmm = "AGO"; break;
      case '09': mmm = "SEP"; break;
      case '10': mmm = "OCT"; break;
      case '11': mmm = "NOV"; break;
      case '12': mmm = "DIC"; break;
    }

    return mmm;
  }

  // Transformar string dd/MM/yyyy a Date
  parseStrToDate(fechaString: any) {
    var parte = fechaString.split("/");//el mes es base 0 por ello se le coloca -1
    return new Date(parte[2], parte[1] - 1, parte[0]);
  }

  // Transformar fechas de XML RPU a aaaa-mm-dd
  parseXMLRPUFechas(mmm: string, yy: string) {
    let dd = '02';
    let mm = null;
    switch (mmm) {
      case 'ENE': mm = '01'; break;
      case 'FEB': mm = '02'; break;
      case 'MAR': mm = '03'; break;
      case 'ABR': mm = '04'; break;
      case 'MAY': mm = '05'; break;
      case 'JUN': mm = '06'; break;
      case 'JUL': mm = '07'; break;
      case 'AGO': mm = '08'; break;
      case 'SEP': mm = '09'; break;
      case 'OCT': mm = '10'; break;
      case 'NOV': mm = '11'; break;
      case 'DIC': mm = '12'; break;
    }
    let yyyy = (2000 + parseInt(yy)).toString();
    return yyyy + '-' + mm + '-' + dd;
  }

  // Transformar fechas aaaa-mm-dd a formato XML RPU mmm-aa
  parseXMLdmyTOymd(date: string) {
    let dd = (parseInt(date.split(' ')[0]) > 9) ? date.split(' ')[0] : '0' + (parseInt(date.split(' ')[0])).toString();
    let mm = '';
    let yyyy = (2000 + parseInt(date.split(' ')[2])).toString();
    switch (date.split(' ')[1]) {
      case 'ENE': mm = '01'; break;
      case 'FEB': mm = '02'; break;
      case 'MAR': mm = '03'; break;
      case 'ABR': mm = '04'; break;
      case 'MAY': mm = '05'; break;
      case 'JUN': mm = '06'; break;
      case 'JUL': mm = '07'; break;
      case 'AGO': mm = '08'; break;
      case 'SEP': mm = '09'; break;
      case 'OCT': mm = '10'; break;
      case 'NOV': mm = '11'; break;
      case 'DIC': mm = '12'; break;
    }
    return yyyy + '-' + mm + '-' + dd;
  }

  // Transformar fecha aaaa-mm-dd a formato XML RPU en un objeto con llaves aa, mmm
  parseDateToMMM_AA(date) {
    let dateSplit = date.split('-');
    let mm = '';
    switch (dateSplit[1]) {
      case '01': mm = "ENE"; break;
      case '02': mm = "FEB"; break;
      case '03': mm = "MAR"; break;
      case '04': mm = "ABR"; break;
      case '05': mm = "MAY"; break;
      case '06': mm = "JUN"; break;
      case '07': mm = "JUL"; break;
      case '08': mm = "AGO"; break;
      case '09': mm = "SEP"; break;
      case '10': mm = "OCT"; break;
      case '11': mm = "NOV"; break;
      case '12': mm = "DIC"; break;
    }
    let
      data = {
        aa: dateSplit[0].slice(-2),
        mmm: mm
      }
    return data;
  }

  getSioNo(valor: boolean){
    return valor ? 'Si' : 'No';
  }

  // Ajuste de números a dos decimales (Dinero)
  currencyFixed(num) {
    if (num > 0)
      return Math.floor(num * 100) / 100;
    else
      return Math.ceil(num * 100) / 100;
  }
  //#endregion CONVERSIONES DE FECHAS

  getOnResize() {
    return (window.innerWidth <= 650) ? 1 : (window.innerWidth > 650 && window.innerWidth <= 950) ? 2 : 3;
  }

  printErrorSnackBar(error: any) {

    let error500Invalid = false;
    if (error) {
      if (error.status >= 0) {

        let mensaje = '';
        switch (error.status) {
          case 0:
            mensaje = 'No se han podido cargar los datos de respuesta. Intente de nuevo por favor.';
            break;
          case 400:
            mensaje = 'Error en la persistencia de datos, verifique que la información que envía es la correcta.';
            break;
          case 403:
            mensaje = 'Error de seguridad y autentificación. Por favor cierre e inicie sesión de nuevo.';
            break;
          case 404:
            mensaje = 'Error de comunicación, no existe el recurso que ha sido pedido.';
            break;
          case 500:
            if ((error.error).includes('org.hibernate.exception.ConstraintViolationException')) {//SQL base de datos
              if (error.url.includes('delete')) {
                mensaje = 'El registro no puede eliminarse debido a que tiene datos asociados.';
              } else {
                mensaje = 'No se puede guardar el registro debido a que se encuentra duplicado.';
              }
            } else if((error.error).includes('Unable to acquire JDBC Connection')) { // Caused by: java.net.SocketException: Connection reset
              error500Invalid = true;
              mensaje = 'Error de conexión a la base de datos, intente de nuevo o contacte a soporte técnico.';
            } else if(error.error.includes('javax.mail.AuthenticationFailedException')){
              mensaje = 'Error de autentificación en el servidor de correo, favor de contactar a soporte técnico';
            } else if(error.error.includes('detached entity')){
              mensaje = 'Error de presistencia de datos en la entidad enviada, favor de contactar a soporte técnico.';
            } else {
              error500Invalid = true;
              mensaje = error.error + '.';
            }
            break;
        }
        if (error.status != 0 && error.status != 403) {
          if(!error500Invalid){
            //this.createLogsErrorService(error).subscribe(()=>{});
          }
          this.snackBar.open(mensaje, 'Entendido', { duration: 3000 });
        } else if(error.status == 403){
          this.cerrarSesion();
        }
      } else {
        //this.createLogsErrorService(error).subscribe(()=>{});
      }
    }
  }

  async cerrarSesion(){
    const dataUser = this.getUserSessionData();
    this.snackBar.open('Su sesión ha caducado, se cerrará su sesión automaticamente, por favor espere.', 'Entendido', { duration: 3000 });
    await timer(5000).subscribe(async ()=>{
      await this.closeSesionLog(dataUser).subscribe(async data=>{
        this.router.navigate(['']);
        localStorage.clear();
        await timer(1000).subscribe(() => {
          scroll(0, 0);
          location.reload();
        });
      }, error => {
        this.printErrorSnackBar(error);
      });
    });
  }

  async printEliminarSnackBar(data: any) {
    if (data) {
      this.snackBar.open('Registro eliminado con éxito.', 'Entendido', { duration: 3000 });
      //this.createLogsOperacionService('DELETE', data).subscribe(() => { });
    }
  }

  async printGuardarSnackBar(data: any) {
    if (data) {
      this.snackBar.open('Registro agregado con éxito.', 'Entendido', { duration: 3000 });
      //this.createLogsOperacionService('POST', data).subscribe(() => { });
    }
  }

  async printEditarSnackBar(data: any) {
    if (data) {
      this.snackBar.open('Registro actualizado con éxito.', 'Entendido', { duration: 3000 });
      //this.createLogsOperacionService('PUT', data).subscribe(() => { });
    }
  }


  //#region GLOBALES
  // MANEJO DE SNACKBAR PARA MENSAJES AL USUARIO
  /**
   * //Descripción: Ejecuta mensajes flotantes para informar estados del sistema al usuario
   * @param tipoMensaje: 1,6,9,11: Errores de comunicación con el servidor |
    2: No hay lista de datos para mostrar |
    3: No existe el elemento que se está consultando |
    4,7: Registro duplicado |
    5,8: Datos de registro incompletos |
    10: Registro no encontrado dentro de la plataforma |
    12: Registro nuevo guardado con éxito |
    13: Registro actualizado con éxito
    14: Registro eliminado con éxito |
    15: Otros mensajes. Se requiere el parámetro mensaje.
   * @param articulo: 1: Masculino | 2: Femenino
   * @param elemento: Nombre del elemento (Ejemplo: sector, dependencia, entidad, etcetera).
   * @param mensaje: Mensaje personalizado. Usar en caso de tipoMensaje 15
   * @param tiempo: Duración en segundos de la notificación
   * @param redirecciona: true | false. Si la notificación redirecciona se ingresa true
   * @param URL: Si el parámetro redirecciona es 'true', se requiere la URL para generar la redirección en el sistema
   * @param error: Si existe un error, se obtiene el parámetro para su posterior guardado y revisión
   */
  printSnackbar(tipoMensaje: number, articulo: number, elemento: string, mensaje: string, tiempo: number, redirecciona: boolean, URL: string, error: any) {
    let
      snackbarMensaje = "",
      snackBarAccion = "Entendido",
      art = articulo == 1 ? 'del' : 'de la',
      art2 = articulo == 1 ? 'El' : 'La',
      art3 = articulo == 1 ? 'el' : 'la',
      time = tiempo == null ? (5 * 1000) : (tiempo * 1000);

    switch (tipoMensaje) {
      case 1:
      case 6:
      case 9:
      case 11:
        snackbarMensaje = "Ocurrió un problema de comunicación con el servidor, contacte al servicio de soporte técnico"; break;
      case 2: snackbarMensaje = art2 + " elemento " + elemento + " no tiene datos para mostrar"; break;
      case 3: snackbarMensaje = "No existe " + art3 + " " + elemento + " que está consultando"; break;
      case 4:
      case 7:
        snackbarMensaje = "Registro duplicado, verifique la información que fue enviada al servidor"; break;
      case 5:
      case 8:
        snackbarMensaje = "Datos del registro incompletos, verifique la información que fue enviada al servidor"; break;
      case 10: snackbarMensaje = "Registro no encontrado dentro de la plataforma"; break;
      case 12: snackbarMensaje = "El nuevo registro " + art + " " + elemento + " se realizó con éxito"; break;
      case 13: snackbarMensaje = "El registro " + art + " " + elemento + " se actualizó con éxito"; break;
      case 14: snackbarMensaje = "El registro " + art + " " + elemento + " se eliminó con éxito"; break;
      case 15: snackbarMensaje = mensaje; break;
    }

    // Almacenar el error en base de datos
    // Pintar la notificación
    let snackBarRef = this.snackBar.open(snackbarMensaje, snackBarAccion, { duration: time });
    snackBarRef.afterDismissed().subscribe(() => { if (redirecciona) this.router.navigate([URL]); });
    snackBarRef.onAction().subscribe(() => { snackBarRef.dismiss(); if (redirecciona) this.router.navigate([URL]); });
  }

  errorHandler(error) {
    if ((error.error).includes('org.hibernate.exception.ConstraintViolationException')) {
      this.printSnackbar(15, null, null, 'Registro duplicado, por favor verifique la información que está ingresando.', 5, false, null, null);
    }
    else {
      this.printSnackbar(1, null, null, null, 5, false, null, error);
      //this.createLogsErrorService(error).subscribe(() => { });
    }
  }


  // MANEJO DE TIPO DE USUARIOS
  getFilteredUserTypeByUserSession(userTypeList, userType) {
    if (userType == 1) {
      return userTypeList;
    }
    else {
      let arrTiposUsuario = [];
      userTypeList.forEach((val, i) => {
        if (val.id >= userType)
          arrTiposUsuario.push(val);
      });
      return arrTiposUsuario;
    }
  }
  // OBTENER Y TRATAR DATOS DE SESION DEL USUARIO
  getUserSessionData() {
    let userData: SesionModel = JSON.parse(decodeURIComponent(escape(atob(localStorage.getItem('session')))));
    return userData;
  }

  getCanActivatedByRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol ? true : (url === '/dashboard' ? true : false);
  }

  getCanCreateRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canCreate;
  }

  getCanUpdateRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canUpdate;
  }

  getCanDeleteRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canDelete;
  }

  getCanShowRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canShow;
  }

  getCanReportRol(url: string) {
    const sesion = this.getUserSessionData();
    const roles = sesion.roles;
    const existRol = roles.find(rol => rol.urlModulo == url);
    return existRol.canReport;
  }

  regexCURP() {
    return "[A-Z]{1}[AEIOU]{1}[A-Z]{2}[0-9]{2}" + "(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])" +
      "[HM]{1}" + "(AS|BC|BS|CC|CS|CH|CL|CM|DF|DG|GT|GR|HG|JC|MC|MN|MS|NT|NL|OC|PL|QT|QR|SP|SL|SR|TC|TS|TL|VZ|YN|ZS|NE)" +
      "[B-DF-HJ-NP-TV-Z]{3}" + "[0-9A-Z]{1}[0-9]{1}$";
  }

  regexRFC() {
    return '^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z]|[0-9]){2}([A]|[0-9]){1})?$';
  }
  //service para la creacion de logs
  // createLogsErrorService(error: any): Observable<any> {
  //   const userData = this.getUserSessionData();
  //   const errorModel = {
  //     url: document.location.href,
  //     error: error,
  //     user: userData.idUsuario
  //   };
  //   this.logErrorModel.id = null;
  //   this.logErrorModel.error = JSON.stringify(errorModel);
  //   this.logErrorModel.fechaHora = new Date();
  //   return this.http.post(`${this.baseUrl}` + '/auth/error/create', this.logErrorModel);
  // }

  createLogsSesionService(idUsuario: number): Observable<any> {
    this.logSesionModel.id = null;
    this.logSesionModel.idUsuario = idUsuario;
    this.logSesionModel.fechaInicio = new Date();
    this.logSesionModel.activo = true;
    return this.http.post(`${this.baseUrl}` + '/auth/sesion/create', this.logSesionModel);
  }

  closeSesionLog(userData): Observable<any> {
    return this.http.get(`${this.baseUrl}/auth/sesion/closeSesion/${userData.idSesion}`);
  }

  // createLogsOperacionService(operacion: string, data: any): Observable<any> {
  //   const userData = localStorage.getItem('session') ? this.getUserSessionData() : null;
  //   this.logOperacionModel.id = null;
  //   this.logOperacionModel.idUsuario = userData ? userData.idUsuario : 0;
  //   this.logOperacionModel.url = document.location.href;
  //   this.logOperacionModel.operacion = operacion;
  //   this.logOperacionModel.fechaHora = new Date();
  //   this.logOperacionModel.data = JSON.stringify(data);
  //   return this.http.post(`${this.baseUrl}` + '/auth/operacion/create', this.logOperacionModel);
  // }
  //#endregion GLOBALES
}
