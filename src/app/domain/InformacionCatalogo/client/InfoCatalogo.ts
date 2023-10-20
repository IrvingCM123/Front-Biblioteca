import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoCatPort } from 'src/app/config/ports/InfoCatalogo/InfoCatalogo-ports';

@Injectable({
  providedIn: 'root'
})

export class InfoCatalogoUseCase {

  constructor(private infoGateway: InfoCatPort) {}

  getGenero(): Observable<any[]> {
    return this.infoGateway.getGenero();
  }

  getClasificacion(): Observable<any[]> {
    return this.infoGateway.getClasificacion();
  }

  getEditorial(): Observable<any[]> {
    return this.infoGateway.getEditorial();
  }

  getSecciones(): Observable<any[]> {
    return this.infoGateway.getSecciones();
  }

}
