import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Location } from '@angular/common';

import { LibrosUseCase } from 'src/app/domain/Libros/client/Libros';
import { RevistaUseCase } from 'src/app/domain/Revistas/client/Revista';
import { InfoCatalogoUseCase } from 'src/app/domain/InformacionCatalogo/client/InfoCatalogo';
import { InventarioUseCase } from 'src/app/domain/Inventario/client/Inventario-usecase';

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
  selector: 'app-nuevolibro',
  templateUrl: './nuevolibro.component.html',
  styleUrls: ['./nuevolibro.component.scss'],
})
export class NuevolibroComponent implements OnInit {
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

  // Variable para el loading

  loading: boolean = false;

  constructor(
    private librosUseCase: LibrosUseCase,
    private revistaUseCase: RevistaUseCase,
    private infoCatalogoUseCase: InfoCatalogoUseCase,
    private storage: AngularFireStorage,
    private location: Location,
    private _inventarioUseCase: InventarioUseCase
  ) {}

  ngOnInit(): void {
    this.LlenarCatalogos();
  }

  // Función para crear un nuevo libro

  async CrearLibro() {
    this.libro.Titulo = this.Titulo;
    this.libro.Autor = this.Autor;
    this.libro.Resena = this.Resena;
    this.libro.Url_Portada = this.Url_Portada;
    this.libro.PrecioVenta = this.PrecioVenta;
    this.libro.PermitirVenta = this.PermitirVenta;
    this.libro.PermitirPrestamo = this.PermitirPrestamo;
    this.libro.Clasificacion_Edad = this.Clasificacion_Edad;
    this.libro.Genero = this.Genero;
    this.libro.Editorial = this.Editorial;
    this.libro.Fecha_Publicacion = this.Fecha_Publicacion;
  }

  // Función para crear una nueva revista

  async CrearRevista() {
    this.revista.Titulo = this.Titulo;
    this.revista.Autor = this.Autor;
    this.revista.Resena = this.Resena;
    this.revista.Url_Portada = this.Url_Portada;
    this.revista.PrecioVenta = this.PrecioVenta;
    this.revista.PermitirVenta = this.PermitirVenta;
    this.revista.PermitirPrestamo = this.PermitirPrestamo;
    this.revista.Clasificacion_Edad = this.Clasificacion_Edad;
    this.revista.Genero = this.Genero;
    this.revista.Editorial = this.Editorial;
    this.revista.Fecha_Publicacion = this.Fecha_Publicacion;
  }

  // Función para crear un nuevo inventario

  async CrearInventario() {
    this.inventario.Seccion_Biblioteca = this.Seccion_Biblioteca;
    this.inventario.Numero_Copias = +this.Numero_Copias;
    this.inventario.Copias_Disponibles = +this.Copias_Disponibles;
    this.inventario.Copias_Disponibles_minimas =
      +this.Copias_Disponibles_minimas;
    this.inventario.ISBN = this.ISBN;
    this.inventario.ISSN = this.ISSN;
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
      console.log(this.libro);
      const response: any = await this.librosUseCase
        .postLibros(this.libro, this.ISBN)
        .toPromise();
      this.id_inventario = response.id;
      await this.CrearInventario();
      await this._inventarioUseCase
        .createInventario(this.inventario)
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
        .postRevista(this.revista, this.ISSN)
        .toPromise();
      this.id_inventario = response.id;
      await this.CrearInventario();
      await this._inventarioUseCase
        .createInventario(this.inventario)
        .toPromise();
    } catch (error) {
      console.error(error);
    }
    this.loading = false;
    //window.location.reload();
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
}
