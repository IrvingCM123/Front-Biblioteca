import { Login_Entity } from '../models/Login.entity';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginPort } from 'src/app/config/ports/Login/login-ports';

@Injectable({
  providedIn: 'root'
})

export class GetLoginUseCase {

  constructor(private loginGateway: LoginPort) {}

  postLogin(Correo_Usuario: string, Contrasena_Usuario: string): Observable<Login_Entity> {
    return this.loginGateway.postLogin(Correo_Usuario, Contrasena_Usuario);
  }

}
