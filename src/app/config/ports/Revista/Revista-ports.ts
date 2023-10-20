import { Observable } from "rxjs";
import { Revista } from "src/app/domain/Revistas/models/Revista.entity";

export abstract class RevistaPort {
  abstract postRevista(Revista: any | [], id_revista: any): Observable<Revista>;
  abstract getRevista(): Observable<Revista[]>;
  abstract deleteRevista(RevistaID: string): Observable<Revista>;
  abstract putRevista(Revista: any | [], id_Revista: any): Observable<Revista>;
  abstract getRevistaID(RevistaID: string): Observable<Revista>;
}
