import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import * as Stomp from 'stompjs';
import * as SockJS from "sockjs-client/dist/sockjs"
import { Observable, Subject } from 'rxjs';

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
      this.stompClient.subscribe('/topic/notification', (message: any) => {
        if (message.body) {
          this.subject.next(JSON.parse(message.body));
        }
      });
    }, (error) => {
      console.log("error")
      console.log(error)
    });
  }

  sendNotification(notification: any): void {
    this.stompClient.send('/notify', {}, JSON.stringify(notification));
  }

  getNotifications(): Observable<any> {
    return this.subject.asObservable();
  }

}
