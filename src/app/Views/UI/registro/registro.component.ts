import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { RegistroUseCase } from 'src/app/domain/Registro/usecase/registro.usecase';

import { FirestoreService } from '../servicios/FirestoreListas.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {
  nombre_usuario: string = '';
  apellido_paterno: string = '';
  apellido_materno: string = '';
  correo_usuario: string = '';
  contrasena_usuario: string = '';
  confirmar_contrasena: string = '';
  NPersonal_usuario: number = 0;

  file: File | any = null;
  comparar: boolean = false;
  Mensaje_Contrasena = false;
  Mostrar_Mensaje = false;
  Mostrar_Mensaje_Cuenta = false;
  mostrarBotonAceptar: boolean = false;


  imageURL: string | any;
  Cuenta: string[] | any;
  Mensaje_Cuenta: any;

  constructor(
    private datosLocales: FirestoreService,
    private location: Location,
    private storage: AngularFireStorage,
    private _cuentaCrear: RegistroUseCase
  ) { }

  async CrearCuenta() {
    this.compararContraseña(this.contrasena_usuario, this.confirmar_contrasena);
    await this.SubirImagenFirestore();

    if (this.comparar == true) {
      this._cuentaCrear.postCuentas(
        this.nombre_usuario,
        this.apellido_paterno,
        this.apellido_materno,
        this.correo_usuario,
        this.contrasena_usuario,
        this.imageURL
      ).subscribe(
        (response) => {
          this.Mensaje_Cuenta = "La cuenta ha sido creada con éxito";
          this.Mostrar_Mensaje_Cuenta = true;
          this.mostrarBotonAceptar = true;

          window.location.reload();
        },
        (error) => {
          this.Mensaje_Cuenta = error.error;
          this.Mostrar_Mensaje_Cuenta = true;
          this.mostrarBotonAceptar = true;
        }
      );
    } else {
      this.Mensaje_Contrasena = true;
      setTimeout(() => {
        this.Mensaje_Contrasena = false;
      }, 4000);
    }
  }

  ocultarMensajeCuenta(): void {
    this.Mostrar_Mensaje_Cuenta = false;
    this.mostrarBotonAceptar = false;
  }

  async SubirImagenFirestore() {
    if (this.file) {
      const filePath = `Multimedia/Imagenes/Usuarios/${this.nombre_usuario}`;
      const fileRef = this.storage.ref(filePath);
      try {
        await this.storage.upload(filePath, this.file);
        const downloadUrl = await fileRef.getDownloadURL().toPromise();
        this.imageURL = downloadUrl;
        console.log(this.imageURL)
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }

  actualizarNombreUsuario(event: Event): void {
    this.nombre_usuario = (event.target as HTMLInputElement).value;

    console.log(this.nombre_usuario);
  }

  actualizarApellidoPaterno(event: Event): void {
    this.apellido_paterno = (event.target as HTMLInputElement).value;

    console.log(this.apellido_paterno);
  }

  actualizarApellidoMaterno(event: Event): void {
    this.apellido_materno = (event.target as HTMLInputElement).value;

    console.log(this.apellido_materno);
  }

  actualizarCorreo(event: Event): void {
    this.correo_usuario = (event.target as HTMLInputElement).value;

    console.log(this.correo_usuario);
  }

  actualizarContrasena(event: Event): void {
    this.contrasena_usuario = (event.target as HTMLInputElement).value;

    console.log(this.contrasena_usuario);
  }

  actualizarconfirmarContrasena(event: Event): void {
    this.confirmar_contrasena = (event.target as HTMLInputElement).value;

    console.log(this.confirmar_contrasena);
  }

  actualizarNumeroPersonal(event: Event): void {
    this.NPersonal_usuario = +(event.target as HTMLInputElement).value;

    console.log(this.NPersonal_usuario);
  }

  compararContraseña(contra1: string, contra2: string) {
    if (contra1 == contra2) {
      this.comparar = true;
    } else {
      this.comparar = false;
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

  IniciarSesion() {
    this.datosLocales.Actualizar_Formulario('login');
    this.datosLocales.guardar_DatoLocal('formulario', 'login');
    this.location.go('/Sistema/Login');
    location.reload();
  }

  ngOnInit(): void {
    this.datosLocales.Actualizar_Login(false);
  }
}
