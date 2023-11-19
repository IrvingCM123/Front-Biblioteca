import { LibrosEntity } from '../models/Libros.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LibroPort } from 'src/app/config/ports/Libros/Libros-port';

@Injectable({
  providedIn: 'root'
})

export class LibrosUseCase {

  constructor(private libroGateway: LibroPort) {}

  postLibros(Contenido : any, id: any): Observable<LibrosEntity> {
    return this.libroGateway.postLibro(Contenido, id);
  }

  getLibros(): Observable<LibrosEntity[]> {
    return this.libroGateway.getLibro();
  }

  getLibro(ISBN: string): Observable<LibrosEntity> {
    return this.libroGateway.getLibroID(ISBN);
  }

  deleteLibro(ISBN: string): Observable<LibrosEntity> {
    return this.libroGateway.deleteLibro(ISBN);
  }

  updateLibro(ISBN: string, Contenido: any): Observable<LibrosEntity> {
    return this.libroGateway.putLibro(ISBN, Contenido);
  }

  realizarPrestamo(ISBN: string, ISSN: string, ID_Usuario: string, Status: boolean): Observable<LibrosEntity> {
    return this.libroGateway.realizarPrestamo(ISBN, ISSN, ID_Usuario, Status);
  }

}
