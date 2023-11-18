import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginPort } from '../../ports/Login/login-ports';
import { Login_Entity } from 'src/app/domain/Login/models/Login.entity';

@Injectable({
  providedIn: 'root',
})
export class LoginAdapter implements LoginPort {
  api = environment.url + '/IniciarSesion';
  api_url = environment.url + '/ObtenerInfoUsuario';
  api_url_actualizar = environment.url + '/users';
  api_url_gestion = environment.url + '/gestion-usuarios';

  constructor(private http: HttpClient) {}

  postLogin(
    Correo_Usuario: string,
    Contrasena_Usuario: string
  ): Observable<Login_Entity> {
    return this.http.post<any>(this.api, {
      Correo_Usuario,
      Contrasena_Usuario,
    });
  }

  getObtenerInfoUsuario(Token: string): Observable<Login_Entity> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${Token}`,
    });
    return this.http.get<any>(this.api_url, { headers });
  }

  putActualizarInfoUsuario(
    token: string,
    url_imagen: string,
    Nombre_Usuario: string,
    Correo_Usuario: string,
    Contrasena_Usuario: string,
    ApellidoM_Usuario: string,
    ApellidoP_Usuario: string,
    Descripcion_Usuario: string,
    Direccion_Usuario: string,
    Telefono_Usuario: string,
    Edad_Usuario: string,
    Ciudad_Usuario: string
  ): Observable<any> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.put<any>(this.api_url_actualizar, {
      url_imagen,
      Nombre_Usuario,
      Correo_Usuario,
      Contrasena_Usuario,
      ApellidoM_Usuario,
      ApellidoP_Usuario,
      Descripcion_Usuario,
      Direccion_Usuario,
      Telefono_Usuario,
      Edad_Usuario,
      Ciudad_Usuario,
    }
    , { headers });
  }

  getGestionUsuarioById(Email: string): Observable<any> {
    return this.http.get<any>(this.api_url_gestion + '/' + Email);
  }
}
