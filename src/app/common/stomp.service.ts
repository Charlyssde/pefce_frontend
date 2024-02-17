import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as Stomp from 'stompjs';
import SockJS from "sockjs-client/dist/sockjs"
import { Observable, Subject } from 'rxjs';
import { NotificacionModel } from '../core/models/notificaciones/notificacion-model';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService  {

  private stompClient: Stomp.Client;
  private subject = new Subject<any>();

  connect(): void {
    const socket = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (res) => {
      console.log("Connected")
      this.stompClient.subscribe('/topic/notification', (message: any) => {
        if (message.body) {
          let notif = JSON.parse(message.body)
          if(localStorage.getItem('id') == notif.destinatario.id.toString()){
            this.subject.next(message);
          }
        }
      });
    }, (error) => {
      console.log("error")
      console.log(error)
    });
  }

  sendNotification(notification: NotificacionModel): void {
    this.stompClient.send('/notify', {}, JSON.stringify(notification));
  }

  getNotifications(): Observable<any> {
    return this.subject.asObservable();
  }

}
