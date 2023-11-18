import { Component, OnInit } from '@angular/core';
import { GetLoginUseCase } from 'src/app/domain/Login/usecase/getLogin';
import { FirestoreService } from '../servicios/FirestoreListas.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(
    private getLoginUseCase: GetLoginUseCase,
    private cache_service: FirestoreService
  ) { }

  public imagen = ""
  public Usuario: any = [];
  public Cuenta: any = [];

  private token: string = '';

  async ngOnInit() {
    this.token = this.cache_service.obtener_DatoLocal('Resp')
    this.Usuario = await this.getLoginUseCase.obtenerInfoUsuario(this.token).toPromise();
    this.Cuenta = await this.getLoginUseCase.getGestionUsuarioById(this.Usuario.Correo_Usuario).toPromise();
  }

}
