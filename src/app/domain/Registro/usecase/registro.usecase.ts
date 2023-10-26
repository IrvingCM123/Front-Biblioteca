import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroPort } from 'src/app/config/ports/Registro/Registro-ports';

@Injectable({
  providedIn: 'root'
})

export class RegistroUseCase {

  constructor(private registroGateway: RegistroPort) { }

  postCuentas(
    Nombre_Usuario: any,
    Apellido_Paterno: any,
    Apellido_Materno: any,
    Correo_Usuario: any,
    Contrasena_Usuario: any,
    Url_Imagen: any,
  ): Observable<any> {
    return this.registroGateway.postCuentas(Nombre_Usuario, Apellido_Paterno, Apellido_Materno, Correo_Usuario, Contrasena_Usuario, Url_Imagen);
  }

  getUsuarioByID(Correo_Usuario: any): Observable<any> {
    return this.registroGateway.getUsuarioByID(Correo_Usuario);
  }

  getUsuarios(): Observable<any> {
    return this.registroGateway.getUsuarios();
  }

}
