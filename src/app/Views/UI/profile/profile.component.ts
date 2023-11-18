import { Component, OnInit } from '@angular/core';
import { GetLoginUseCase } from 'src/app/domain/Login/usecase/getLogin';
import { FirestoreService } from '../servicios/FirestoreListas.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    private _gateWay : GetLoginUseCase,
    private _cache: FirestoreService,
    private storage: AngularFireStorage,
    private location: Location,
  ) { }

  private token_Obtenido : string = "";
  private Informacion_Usuario : [] | any = [];
  public id : string = "";
  public url_imagen : string = "";
  public Nombre_Usuario : string = "";
  public Correo_Usuario : string = "";
  public Contrasena_Usuario : string = "";
  public ApellidoM_Usuario : string = "";
  public ApellidoP_Usuario : string = "";
  public Descripcion_Usuario : string = "";
  public Direccion_Usuario : string = "";
  public Telefono_Usuario : string = "";
  public Edad_Usuario : string = "";
  public Ciudad_Usuario : string = "";

  public imageURL : string | any;
  public file: File | any = null;

  async ngOnInit() {
    this.token_Obtenido = this._cache.obtener_DatoLocal('Resp')
    this.Informacion_Usuario = await this._gateWay.obtenerInfoUsuario(this.token_Obtenido).toPromise();
    this.LlenarInformacion();
  }

  async ActualizarInformacionUsuario() {
    this._gateWay.actualizarInfoUsuario(
      this.token_Obtenido,
      this.url_imagen,
      this.Nombre_Usuario,
      this.Correo_Usuario,
      this.Contrasena_Usuario,
      this.ApellidoM_Usuario,
      this.ApellidoP_Usuario,
      this.Descripcion_Usuario,
      this.Direccion_Usuario,
      this.Telefono_Usuario,
      this.Edad_Usuario,
      this.Ciudad_Usuario
    ).toPromise();

  }

  async LlenarInformacion() {
    await this.Informacion_Usuario;
    this.url_imagen = this.Informacion_Usuario.url_imagen;
    this.Nombre_Usuario = this.Informacion_Usuario.Nombre_Usuario;
    this.Correo_Usuario = this.Informacion_Usuario.Correo_Usuario;
    this.Contrasena_Usuario = this.Informacion_Usuario.Contrasena_Usuario;
    this.ApellidoM_Usuario = this.Informacion_Usuario.ApellidoM_Usuario;
    this.ApellidoP_Usuario = this.Informacion_Usuario.ApellidoP_Usuario;
    this.Descripcion_Usuario = this.Informacion_Usuario.Descripcion_Usuario;
    this.Direccion_Usuario = this.Informacion_Usuario.Direccion_Usuario;
    this.Telefono_Usuario = this.Informacion_Usuario.Telefono_Usuario;
    this.Edad_Usuario = this.Informacion_Usuario.Edad_Usuario;
    this.Ciudad_Usuario = this.Informacion_Usuario.Ciudad_Usuario;
  }

  async Guardar() {
    let error: boolean = false;
    try {
      await this.SubirImagenFirestore();

      await this.ActualizarInformacionUsuario();
      console.log(this.url_imagen);
    } catch (error) {
      error = true;
      alert('Error al actualizar la información');
    } finally {
      if (!error) {
        alert('Información actualizada correctamente');
        window.location.reload();
      }
    }
  }

  async SubirImagenFirestore() {
    try {
      if (this.file) {
        const filePath = `Multimedia/Imagenes/Usuarios/${this.Nombre_Usuario}`;
        const fileRef = this.storage.ref(filePath);
        try {
          await this.storage.upload(filePath, this.file);
          const downloadUrl = await fileRef.getDownloadURL().toPromise();
          this.url_imagen = downloadUrl;
          this.imageURL = downloadUrl;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  GuardarImagen(event: any) {
    this.file = event.target.files[0];
    this.MostrarImagen(this.file);
  }

  MostrarImagen(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageURL = e.target.result;
    };
    reader.readAsDataURL(file);
  }

}
