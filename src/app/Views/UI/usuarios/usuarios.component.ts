import { Location } from '@angular/common';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GetLoginUseCase } from 'src/app/domain/Login/usecase/getLogin';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  @Output('Usuario') usuarioSeleccionado = new EventEmitter<string>();


  constructor(
    private _gateway : GetLoginUseCase,
    private location: Location
  ) { }

  public Usuarios: any = [];
  public Cuentas: any = [];

  async ngOnInit() {
    this.Usuarios = await this._gateway.getAllUsuarios().toPromise();
    for (let i = 0; i < this.Usuarios.length; i++) {
      let informacion = await this._gateway.getGestionUsuarioById(this.Usuarios[i].Correo_Usuario).toPromise();
      this.Cuentas.push(informacion);
    }
  }

  RedirectToPerfil(correo: string) {
    this.usuarioSeleccionado.emit(correo);
    this.location.replaceState('/Perfil');
  }

}
