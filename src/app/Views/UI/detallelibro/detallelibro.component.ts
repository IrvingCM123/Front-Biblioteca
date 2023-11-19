import { Component, OnInit, ElementRef } from '@angular/core';
import { Cache_Service } from '../services/cache.service';
import { FirestoreService } from '../servicios/FirestoreListas.service';

import { LibrosUseCase } from 'src/app/domain/Libros/client/Libros';
import { InventarioUseCase } from 'src/app/domain/Inventario/client/Inventario-usecase';
import { InfoCatalogoUseCase } from 'src/app/domain/InformacionCatalogo/client/InfoCatalogo';
import { RevistaUseCase } from 'src/app/domain/Revistas/client/Revista';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { GetLoginUseCase } from 'src/app/domain/Login/usecase/getLogin';

interface LibroInterface {
  Titulo: string;
  Autor: string;
  Resena: string;
  Url_Portada: string;
  PrecioVenta: number;
  PermitirVenta: boolean;
  PermitirPrestamo: boolean;
  Clasificacion_Edad: string;
  Genero: string;
  Editorial: string;
  Fecha_Publicacion: string;
}

interface RevistaInterface {
  Titulo: string;
  Autor: string;
  Resena: string;
  Url_Portada: string;
  PrecioVenta: number;
  PermitirVenta: boolean;
  PermitirPrestamo: boolean;
  Clasificacion_Edad: string;
  Genero: string;
  Editorial: string;
  Fecha_Publicacion: string;
}

interface InventarioInterface {
  Seccion_Biblioteca: string;
  Numero_Copias: number;
  Copias_Disponibles: number;
  Copias_Disponibles_minimas: number;
  ISBN: string;
  ISSN: string;
}

interface CatalogoInterface {
  NombreCatalogo: string;
}

@Component({
  selector: 'app-detallelibro',
  templateUrl: './detallelibro.component.html',
  styleUrls: ['./detallelibro.component.scss'],
})
export class DetallelibroComponent implements OnInit {
  mostar_input_codigo = false;

  // ID del libro a mostrar
  public Libro_ID: string | any;

  // Libro a mostrar
  public Libro: any;

  // Informacion del libro en el inventario
  public Inventario: any;

  // Variables generales para el formulario de libros

  public Titulo: string | any = '';
  public Autor: string | any = '';
  public Resena: string | any = '';
  public Url_Portada: string | any = '';
  public PrecioVenta: number | any = 0;
  public PermitirVenta: boolean | any = false;
  public PermitirPrestamo: boolean | any = false;
  public Clasificacion_Edad: string | any = '';
  public Genero: string | any = '';
  public Editorial: string | any = '';
  public Fecha_Publicacion: string | any = '';

  // Variables especificas

  public ISBN: string | any = null;
  public ISSN: string | any = null;
  public TipoRecurso: string | any = '';

  // Variables para el formulario de inventario

  public Seccion_Biblioteca: string | any = '';
  public Numero_Copias: number | any = 0;
  public Copias_Disponibles: number | any = 0;
  public Copias_Disponibles_minimas: number | any = 0;

  // Variables para guardar la imagen del formulario

  public portada: File | any = null;

  // Variables para guardar los catalogos de la base de datos

  public clasificaciones: CatalogoInterface = {
    NombreCatalogo: '',
  };

  public catalogo_clasificacion: any = [];

  public generos: CatalogoInterface = {
    NombreCatalogo: '',
  };

  public catalogo_genero: any = [];

  public editoriales: CatalogoInterface = {
    NombreCatalogo: '',
  };

  public catalogo_editorial: any = [];

  public secciones: CatalogoInterface = {
    NombreCatalogo: '',
  };

  public catalogo_seccion: any = [];

  // Variables para guardar los datos de los libros

  public libro: LibroInterface = {
    Titulo: '',
    Autor: '',
    Resena: '',
    Url_Portada: '',
    PrecioVenta: 0,
    PermitirVenta: false,
    PermitirPrestamo: false,
    Clasificacion_Edad: '',
    Genero: '',
    Editorial: '',
    Fecha_Publicacion: '',
  };

  // Variables para guardar los datos de las revistas

  public revista: RevistaInterface = {
    Titulo: '',
    Autor: '',
    Resena: '',
    Url_Portada: '',
    PrecioVenta: 0,
    PermitirVenta: false,
    PermitirPrestamo: false,
    Clasificacion_Edad: '',
    Genero: '',
    Editorial: '',
    Fecha_Publicacion: '',
  };

  // Variables para guardar los datos del inventario

  public inventario: InventarioInterface = {
    Seccion_Biblioteca: '',
    Numero_Copias: 0,
    Copias_Disponibles: 0,
    Copias_Disponibles_minimas: 0,
    ISBN: '',
    ISSN: '',
  };

  // Variables para mostrar u ocultar los inputs

  mostar_input_precio = false;
  mostrar_input_ISBN = false;
  mostrar_input_ISSN = false;

  // Variables para el consentimiento de los formularios

  consentimiento = false;
  botonHabilitado = false;

  // Variables para el ID del inventario

  id_inventario = '';

  tipo_recurso = '';

  // Variable para el loading

  loading: boolean = false;
  mostrar_formulario: boolean = false;
  loading_get: boolean = false;

  constructor(
    private el: ElementRef,
    private cache_Service: Cache_Service,
    private firestoreService: FirestoreService,
    private librosUseCase: LibrosUseCase,
    private inventarioUseCase: InventarioUseCase,
    private infoCatalogoUseCase: InfoCatalogoUseCase,
    private revistaUseCase: RevistaUseCase,
    private storage: AngularFireStorage,
    private router: Router,
    private getLoginUseCase: GetLoginUseCase
  ) { }

  token: any;
  Usuario: any;

  async ngOnInit() {
    this.LlenarCatalogos();
    this.Libro_ID = await this.cache_Service.obtener_DatoLocal('id_libro');
    this.obtenerLibro();

    this.token = this.firestoreService.obtener_DatoLocal('Resp');
    this.Usuario = await this.getLoginUseCase
      .obtenerInfoUsuario(this.token)
      .toPromise();
  }

  async obtenerLibro() {
    this.loading_get = true;

    try {
      this.Libro = await this.librosUseCase.getLibro(this.Libro_ID).toPromise();
      this.Inventario = await this.inventarioUseCase
        .getInventarioById(this.Libro_ID)
        .toPromise();
      this.tipo_recurso = 'Libro';
    } catch (error) {
      this.Libro = await this.revistaUseCase
        .getRevistaID(this.Libro_ID)
        .toPromise();
      this.Inventario = await this.inventarioUseCase
        .getInventarioById(this.Libro_ID)
        .toPromise();
      this.tipo_recurso = 'Revista';
    }

    this.loading_get = false;
  }

  MostrarFormulario() {
    this.mostrar_formulario = true;
  }

  OcultarFormulario() {
    this.mostrar_formulario = false;
  }

  // Función para crear un nuevo libro

  async CrearLibro() {
    this.libro.Titulo = this.Titulo || this.Libro.Titulo;
    this.libro.Autor = this.Autor || this.Libro.Autor;
    this.libro.Resena = this.Resena || this.Libro.Resena;
    this.libro.Url_Portada = this.Url_Portada || this.Libro.Url_Portada;
    this.libro.PrecioVenta = this.PrecioVenta || this.Libro.PrecioVenta;
    this.libro.PermitirVenta = this.PermitirVenta || this.Libro.PermitirVenta;
    this.libro.PermitirPrestamo =
      this.PermitirPrestamo || this.Libro.PermitirPrestamo;
    this.libro.Clasificacion_Edad =
      this.Clasificacion_Edad || this.Libro.Clasificacion_Edad;
    this.libro.Genero = this.Genero || this.Libro.Genero;
    this.libro.Editorial = this.Editorial || this.Libro.Editorial;
    this.libro.Fecha_Publicacion =
      this.Fecha_Publicacion || this.Libro.Fecha_Publicacion;
  }

  // Función para crear una nueva revista

  async CrearRevista() {
    this.revista.Titulo = this.Titulo || this.Libro.Titulo;
    this.revista.Autor = this.Autor || this.Libro.Autor;
    this.revista.Resena = this.Resena || this.Libro.Resena;
    this.revista.Url_Portada = this.Url_Portada || this.Libro.Url_Portada;
    this.revista.PrecioVenta = this.PrecioVenta || this.Libro.PrecioVenta;
    this.revista.PermitirVenta = this.PermitirVenta || this.Libro.PermitirVenta;
    this.revista.PermitirPrestamo =
      this.PermitirPrestamo || this.Libro.PermitirPrestamo;
    this.revista.Clasificacion_Edad =
      this.Clasificacion_Edad || this.Libro.Clasificacion_Edad;
    this.revista.Genero = this.Genero || this.Libro.Genero;
    this.revista.Editorial = this.Editorial || this.Libro.Editorial;
    this.revista.Fecha_Publicacion =
      this.Fecha_Publicacion || this.Libro.Fecha_Publicacion;
  }

  // Función para crear un nuevo inventario

  async CrearInventario() {
    this.inventario.Seccion_Biblioteca =
      this.Seccion_Biblioteca || this.Inventario.Seccion_Biblioteca;
    this.inventario.Numero_Copias =
      +this.Numero_Copias || this.Inventario.Numero_Copias;
    this.inventario.Copias_Disponibles =
      +this.Copias_Disponibles || this.Inventario.Copias_Disponibles;
    this.inventario.Copias_Disponibles_minimas =
      +this.Copias_Disponibles_minimas ||
      this.Inventario.Copias_Disponibles_minimas;
    this.inventario.ISBN = this.ISBN || this.Inventario.ISBN;
    this.inventario.ISSN = this.ISSN || this.Inventario.ISSN;
  }

  // Funciones para la imagen

  // Función para subir la imagen a firebase

  async SubirImagen() {
    if (this.portada != null) {
      const file = this.portada;
      const filePath = `/portadas/${this.Titulo}`;
      const fileRef = this.storage.ref(filePath);
      await this.storage.upload(filePath, file);
      const downloadUrl: any = await fileRef.getDownloadURL().toPromise();
      console.log(downloadUrl);
      this.libro.Url_Portada = downloadUrl;
      this.revista.Url_Portada = downloadUrl;

      this.Url_Portada = downloadUrl;
    } else {
      this.libro.Url_Portada = '';
      this.revista.Url_Portada = '';
    }
  }

  // Función para obtener la imagen del formulario

  GuardarImagen(event: any) {
    this.portada = event.target.files[0];
    this.MostrarImagen(this.portada);
  }

  // Función para mostrar la imagen en el formulario

  MostrarImagen(file: File | any) {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.Url_Portada = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Funciones para el formulario de libros

  async LlenarCatalogos() {
    await this.infoCatalogoUseCase.getGenero().subscribe(
      (data: any) => {
        this.catalogo_genero = data;
      },
      (error) => {
        console.log(error);
      }
    );

    await this.infoCatalogoUseCase.getClasificacion().subscribe(
      (data: any) => {
        this.catalogo_clasificacion = data;
      },
      (error) => {
        console.log(error);
      }
    );

    await this.infoCatalogoUseCase.getEditorial().subscribe(
      (data: any) => {
        this.catalogo_editorial = data;
      },
      (error) => {
        console.log(error);
      }
    );

    await this.infoCatalogoUseCase.getSecciones().subscribe(
      (data: any) => {
        console.log(data);
        this.catalogo_seccion = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // Función para guardar los datos del formulario de libros

  async GuardarLibro() {
    this.loading = true;
    try {
      await this.SubirImagen();
      this.CrearLibro();
      const response: any = await this.librosUseCase
        .updateLibro(this.Libro_ID, this.libro)
        .toPromise();
      this.id_inventario = response.id;
      await this.CrearInventario();
      await this.inventarioUseCase
        .updateInventario(this.inventario, this.Libro_ID)
        .toPromise();
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
  }

  // Función para guardar los datos del formulario de revistas

  async GuardarRevista() {
    this.loading = true;
    try {
      await this.SubirImagen();
      this.CrearRevista();
      const response: any = await this.revistaUseCase
        .putRevista(this.ISSN, this.revista)
        .toPromise();
      await this.CrearInventario();
      await this.inventarioUseCase
        .updateInventario(this.inventario, this.Libro_ID)
        .toPromise();
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
    window.location.reload();
  }

  async EliminarProducto() {
    await this.inventarioUseCase.deleteInventario(this.Libro_ID).toPromise();
    try {
      await this.librosUseCase.deleteLibro(this.Libro_ID).toPromise();
      // Si no se elimina intenta eliminar una revista, no tengo controlado si es libro o revista
    } catch {
      await this.revistaUseCase.deleteRevista(this.Libro_ID).toPromise();
    } finally {
      console.log('Eliminado');
      this.cache_Service.eliminar_DatoLocal('producto');
      this.router.navigate(['/Libros']);
    }
  }

  // Funciones para actualizar los datos del formulario en variables

  ActualizarTitulo(event: Event | any): void {
    this.Titulo = (event.target as HTMLInputElement).value;
  }

  ActualizarAutor(event: Event | any): void {
    this.Autor = (event.target as HTMLInputElement).value;
  }

  ActualizarResena(event: Event | any): void {
    this.Resena = (event.target as HTMLInputElement).value;
  }

  ActualizarPrecioVenta(event: Event | any): void {
    this.PrecioVenta = (event.target as HTMLInputElement).value;
  }

  ActualizarPermitirVenta(event: Event | any): void {
    this.PermitirVenta = (event.target as HTMLInputElement).value;

    if (this.PermitirVenta == 'true') {
      this.mostar_input_precio = true;
    } else {
      this.mostar_input_precio = false;
    }
  }

  ActualizarPermitirPrestamo(event: Event | any): void {
    this.PermitirPrestamo = (event.target as HTMLInputElement).value;
  }

  ActualizarClasificacionEdad(event: Event | any): void {
    this.Clasificacion_Edad = (event.target as HTMLInputElement).value;
  }

  ActualizarGenero(event: Event | any): void {
    this.Genero = (event.target as HTMLInputElement).value;
  }

  ActualizarEditorial(event: Event | any): void {
    this.Editorial = (event.target as HTMLInputElement).value;
  }

  ActualizarFechaPublicacion(event: Event | any): void {
    this.Fecha_Publicacion = (event.target as HTMLInputElement).value;
  }

  ActualizarISBN(event: Event | any): void {
    this.ISBN = (event.target as HTMLInputElement).value;
  }

  ActualizarISSN(event: Event | any): void {
    this.ISSN = (event.target as HTMLInputElement).value;
  }

  ActualizarTipoRecurso(event: Event | any): void {
    this.TipoRecurso = (event.target as HTMLInputElement).value;

    if (this.TipoRecurso == 'Libro') {
      this.mostrar_input_ISSN = false;
      this.mostrar_input_ISBN = true;
    } else {
      this.mostrar_input_ISBN = false;
      this.mostrar_input_ISSN = true;
    }
  }

  ActualizarSeccionBiblioteca(event: Event | any): void {
    this.Seccion_Biblioteca = (event.target as HTMLInputElement).value;
    console.log(this.Seccion_Biblioteca);
  }

  ActualizarNumeroCopias(event: Event | any): void {
    this.Numero_Copias = (event.target as HTMLInputElement).value;
  }

  ActualizarCopiasDisponibles(event: Event | any): void {
    this.Copias_Disponibles = (event.target as HTMLInputElement).value;
  }

  ActualizarCopiasDisponiblesMinimas(event: Event | any): void {
    this.Copias_Disponibles_minimas = (event.target as HTMLInputElement).value;
  }

  RealizarPrestamo() {
    let error = false;
    try {
      let ISBN = '';
      let ISSN = '';
      let ID_Usuario = '';
      let Status = false;

      ID_Usuario = this.Usuario.Correo_Usuario;

      if (this.tipo_recurso == 'Libro') {
        ISBN = this.Libro_ID;
        console.log(ISBN);
      } else {
        ISSN = this.Libro_ID;
        console.log(ISSN);
      }

      Status = true;

      this.librosUseCase.realizarPrestamo(
        ISBN,
        ISSN,
        ID_Usuario,
        Status
      ).toPromise();
    } catch (error) {
      console.log(error);
      alert('Error al realizar el prestamo');
      error = true;
    } finally {
      if (!error) {
        alert('Prestamo realizado con exito');
        window.location.reload();
      }
    }

  }
}
