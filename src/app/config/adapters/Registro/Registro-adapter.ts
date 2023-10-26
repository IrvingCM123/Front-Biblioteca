import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RegistroPort } from '../../ports/Registro/Registro-ports';

@Injectable({
  providedIn: 'root'
})
export class RegistroAdapter implements RegistroPort {

  api = environment.url+"/users";

  constructor(private http: HttpClient) {}

  postCuentas(
    Nombre_Usuario: any,
    Apellido_Paterno: any,
    Apellido_Materno: any,
    Correo_Usuario: any,
    Contrasena_Usuario: any,
    Url_Imagen: any,
  ): Observable<any> {
    return this.http.post<any>(this.api, {Nombre_Usuario, Apellido_Paterno, Apellido_Materno, Correo_Usuario, Contrasena_Usuario, Url_Imagen});
  }

  getUsuarioByID(Correo_Usuario: any): Observable<any> {
    return this.http.get<any>(this.api+"/"+Correo_Usuario);
  }

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.api);
  }

}
