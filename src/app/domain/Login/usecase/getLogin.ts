import { Login_Entity } from '../models/Login.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPort } from 'src/app/config/ports/Login/login-ports';

@Injectable({
  providedIn: 'root',
})
export class GetLoginUseCase {
  constructor(private loginGateway: LoginPort) {}

  postLogin(
    Correo_Usuario: string,
    Contrasena_Usuario: string
  ): Observable<Login_Entity> {
    return this.loginGateway.postLogin(Correo_Usuario, Contrasena_Usuario);
  }

  obtenerInfoUsuario(Token: string): Observable<Login_Entity> {
    return this.loginGateway.getObtenerInfoUsuario(Token);
  }

  actualizarInfoUsuario(
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
    return this.loginGateway.putActualizarInfoUsuario(
      token,
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
      Ciudad_Usuario
    );
  }

  getGestionUsuarioById(id: string): Observable<any> {
    return this.loginGateway.getGestionUsuarioById(id);
  }
}
