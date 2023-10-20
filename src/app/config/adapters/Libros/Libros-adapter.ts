import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LibroPort } from '../../ports/Libros/Libros-port';
import { LibrosEntity } from 'src/app/domain/Libros/models/Libros.entity';

@Injectable({
  providedIn: 'root',
})
export class LibroAdapter implements LibroPort {
  private url = environment.url + '/libros/';
  private url_obtenerLibros = environment.url + '/isbn/disponibles';

  constructor(private http: HttpClient) {}

  postLibro(Libro: any, id_libro: any): Observable<LibrosEntity> {
    return this.http.post<LibrosEntity>(this.url + id_libro, Libro, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getLibro(): Observable<LibrosEntity[]> {
    return this.http.get<LibrosEntity[]>(this.url_obtenerLibros, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteLibro(LibroID: string): Observable<LibrosEntity> {
    return this.http.delete<LibrosEntity>(this.url + LibroID, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  putLibro(Libro: any, id_Libro: any): Observable<LibrosEntity> {
    return this.http.put<LibrosEntity>(this.url + id_Libro, Libro, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getLibroID(LibroID: string): Observable<LibrosEntity> {
    return this.http.get<LibrosEntity>(this.url + LibroID, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }
}
