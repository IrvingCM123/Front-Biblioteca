import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { InventarioPorts } from '../../ports/Inventario/inventario-port';

@Injectable({
  providedIn: 'root',
})
export class InventarioAdapter implements InventarioPorts {

  private url = environment.url + '/inventario/';

  constructor(private http: HttpClient) {}

  getInventario(): Observable<any> {
    return this.http.get(this.url);
  }

  postInventario(Inventario: any | []): Observable<any> {
    return this.http.post(this.url, Inventario);
  }

  deleteInventario(InventarioID: string): Observable<any> {
    return this.http.delete(this.url + InventarioID);
  }

  putInventario(Inventario: any | [], id_Inventario: any): Observable<any> {
    return this.http.put(this.url + id_Inventario, Inventario);
  }

  getInventarioID(InventarioID: string): Observable<any> {
    return this.http.get(this.url + InventarioID);
  }

}
