import { Component, OnInit, ElementRef } from '@angular/core';
import { Cache_Service } from '../services/cache.service';
import { LibrosUseCase } from 'src/app/domain/Libros/client/Libros';

@Component({
  selector: 'app-detallelibro',
  templateUrl: './detallelibro.component.html',
  styleUrls: ['./detallelibro.component.scss']
})
export class DetallelibroComponent implements OnInit {

  mostar_input_codigo = false

  // Define las variables utilizadas en el código original
  public Libro_ID: string | any;
  public Libro: any ;

  constructor(private el: ElementRef,
    private cache_Service: Cache_Service,
    private librosUseCase: LibrosUseCase
  ) { }

  ngOnInit() {
    this.Libro_ID = this.cache_Service.obtener_DatoLocal('id_libro');
    console.log(this.Libro_ID);
  }

  obtenerLibro() {
    this.librosUseCase.getLibro(this.Libro_ID).subscribe((res) => {
      console.log(res);
      this.Libro = res;
    });
  }


}
