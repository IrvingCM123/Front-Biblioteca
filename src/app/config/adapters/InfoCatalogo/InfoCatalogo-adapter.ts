import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InfoCatPort } from '../../ports/InfoCatalogo/InfoCatalogo-ports';

@Injectable({
  providedIn: 'root',
})
export class InfoCatAdapter implements InfoCatPort {

  apiUrl = environment.url;
  url_genero = this.apiUrl + '/catalogo-genero/';
  url_clasificacion = this.apiUrl + '/catalogo-clasificacion/';
  url_editorial = this.apiUrl + '/catalogo-editorial/';
  url_seccion = this.apiUrl + '/catalogo-seccion/';

  constructor(private http: HttpClient) {}

  getGenero(): Observable<any[]> {
    return this.http.get<any[]>(this.url_genero, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getClasificacion(): Observable<any[]> {
    return this.http.get<any[]>(this.url_clasificacion, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getEditorial(): Observable<any[]> {
    return this.http.get<any[]>(this.url_editorial, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getSecciones(): Observable<any[]> {
    return this.http.get<any[]>(this.url_seccion, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

}
