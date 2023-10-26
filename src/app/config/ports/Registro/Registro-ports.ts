import { Observable, observable } from "rxjs";

export abstract class RegistroPort {
  abstract postCuentas(Nombre_Usuario: any,
    Apellido_Paterno: any,
    Apellido_Materno: any,
    Correo_Usuario: any,
    Contrasena_Usuario: any,
    Url_Imagen: any,
  ): Observable<any>;


  abstract getUsuarioByID(Correo_Usuario: any): Observable<any>;

  abstract getUsuarios(): Observable<any>;

}
