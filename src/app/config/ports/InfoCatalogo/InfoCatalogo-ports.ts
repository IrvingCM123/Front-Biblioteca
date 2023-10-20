import { Observable } from "rxjs";

export abstract class InfoCatPort {
  abstract getGenero(): Observable<any[]>;
  abstract getClasificacion(): Observable<any[]>;
  abstract getEditorial(): Observable<any[]>;
  abstract getSecciones(): Observable<any[]>;
}
