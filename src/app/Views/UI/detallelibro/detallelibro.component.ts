import { Component, OnInit, ElementRef } from '@angular/core';
import { Cache_Service } from '../services/cache.service';
import { LibrosUseCase } from 'src/app/domain/Libros/client/Libros';
import { InventarioUseCase } from 'src/app/domain/Inventario/client/Inventario-usecase';

@Component({
  selector: 'app-detallelibro',
  templateUrl: './detallelibro.component.html',
  styleUrls: ['./detallelibro.component.scss']
})
export class DetallelibroComponent implements OnInit {

  mostar_input_codigo = false

  // ID del libro a mostrar
  public Libro_ID: string | any;

  // Libro a mostrar
  public Libro: any;

  // Informacion del libro en el inventario
  public Inventario: any;

  constructor(private el: ElementRef,
    private cache_Service: Cache_Service,
    private librosUseCase: LibrosUseCase,
    private inventarioUseCase: InventarioUseCase,
  ) { }

  async ngOnInit() {
    this.Libro_ID = await this.cache_Service.obtener_DatoLocal('id_libro');
    this.obtenerLibro();
  }

  async obtenerLibro() {
    this.Libro = await this.librosUseCase.getLibro(this.Libro_ID).toPromise();
    this.Inventario = await this.inventarioUseCase.getInventarioById(this.Libro_ID).toPromise();
  }


}
