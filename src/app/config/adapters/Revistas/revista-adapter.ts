import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RevistaPort } from '../../ports/Revista/Revista-ports';
import { Revista } from 'src/app/domain/Revistas/models/Revista.entity';

@Injectable({
  providedIn: 'root',
})
export class RevistaAdapter implements RevistaPort {
  private url = environment.url + '/revistas/';

  constructor(private http: HttpClient) {}

  postRevista(Revista: any, id_revista: any): Observable<Revista> {
    return this.http.post<Revista>(this.url + id_revista, Revista, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getRevista(): Observable<Revista[]> {
    return this.http.get<Revista[]>(this.url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  deleteRevista(RevistaID: string): Observable<Revista> {
    return this.http.delete<Revista>(this.url + RevistaID, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  putRevista( id_Revista: any, Revista: any): Observable<Revista> {
    return this.http.put<Revista>(this.url + id_Revista, Revista, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }

  getRevistaID(RevistaID: string): Observable<Revista> {
    return this.http.get<Revista>(this.url + RevistaID, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    });
  }


}
