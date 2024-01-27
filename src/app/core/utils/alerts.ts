import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Alerts {

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(DOCUMENT) document: any,
  ) { }

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
            // this.authService.createLogsErrorService(error).subscribe(()=>{});
          }
          this.snackBar.open(mensaje, 'Entendido', { duration: 3000 });
        } else if(error.status == 403){
          // this.authService.cerrarSesion();
        }
      } else {
        // this.authService.createLogsErrorService(error).subscribe(()=>{});
      }
    }
  }

  async printEliminarSnackBar(data: any) {
    if (data) {
      this.snackBar.open('Registro eliminado con éxito.', 'Entendido', { duration: 3000 });
      // this.authService.createLogsOperacionService('DELETE', data).subscribe(() => { });
    }
  }

  async printGuardarSnackBar(data: any) {
    if (data) {
      this.snackBar.open('Registro agregado con éxito.', 'Entendido', { duration: 3000 });
      // this.authService.createLogsOperacionService('POST', data).subscribe(() => { });
    }
  }

  async printEditarSnackBar(data: any) {
    if (data) {
      this.snackBar.open('Registro actualizado con éxito.', 'Entendido', { duration: 3000 });
      // this.authService.createLogsOperacionService('PUT', data).subscribe(() => { });
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
      // this.authService.createLogsErrorService(error).subscribe(() => { });
    }
  }
}
