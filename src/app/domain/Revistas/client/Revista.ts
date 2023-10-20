import { Revista } from '../models/Revista.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RevistaPort } from 'src/app/config/ports/Revista/Revista-ports';

@Injectable({
  providedIn: 'root'
})

export class RevistaUseCase {

  constructor(private revistaGateway: RevistaPort) {}

  postRevista(Contenido : any, id: any ): Observable<Revista> {
    return this.revistaGateway.postRevista(Contenido, id);
  }

  getRevista(): Observable<Revista[]> {
    return this.revistaGateway.getRevista();
  }

  getRevistaID(ISSN: string): Observable<Revista> {
    return this.revistaGateway.getRevistaID(ISSN);
  }

  deleteRevista(ISSN: string): Observable<Revista> {
    return this.revistaGateway.deleteRevista(ISSN);
  }

  putRevista(ISSN: string, Contenido: any): Observable<Revista> {
    return this.revistaGateway.putRevista(ISSN, Contenido);
  }

}
