import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  constructor() { }

    // Usamos un Subject para emitir eventos
    private goToPageSubject = new Subject<void>();

    // Observable para que los componentes se suscriban a los eventos
    goToPage$ = this.goToPageSubject.asObservable();

    // Método para emitir el evento
    emitGoToPage() {
      this.goToPageSubject.next();
    }
}
