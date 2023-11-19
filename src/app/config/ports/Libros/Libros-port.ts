import { Observable } from "rxjs";
import { LibrosEntity } from "src/app/domain/Libros/models/Libros.entity";

export abstract class LibroPort {
  abstract postLibro(Libro: any | [], id_libro: any): Observable<LibrosEntity>;
  abstract getLibro(): Observable<LibrosEntity[]>;
  abstract deleteLibro(LibroID: string): Observable<LibrosEntity>;
  abstract putLibro(Libro: any | [], id_Libro: any): Observable<LibrosEntity>;
  abstract getLibroID(LibroID: string): Observable<LibrosEntity>;
  abstract realizarPrestamo(
    ISBN: string,
    ISSN: string,
    ID_Usuario: string,
    Status: boolean
  ): Observable<LibrosEntity>;
}
