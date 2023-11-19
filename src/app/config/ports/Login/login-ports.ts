import { Login_Entity } from "src/app/domain/Login/models/Login.entity";
import { Observable, observable } from "rxjs";

export abstract class LoginPort {
  abstract postLogin(Correo_Usuario: any, Contrasena_Usuario: any) : Observable<Login_Entity>;
  abstract getObtenerInfoUsuario(Token: any) : Observable<Login_Entity>;
  abstract putActualizarInfoUsuario(
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
  ): Observable<any>;

  abstract getGestionUsuarioById (id: string) : Observable<any>;
  abstract getObtenerInfoUsuarioByEmail (Correo_Usuario: string) : Observable<Login_Entity>;
  abstract getAllUsuarios() : Observable<any>;
  abstract getHistorialPrestamos(): Observable<any>;
  abstract getHistorialDevoluciones(): Observable<any>;
  abstract realizarDevolucion (id: string) : Observable<any>;
}

