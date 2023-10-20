import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-detallelibro',
  templateUrl: './detallelibro.component.html',
  styleUrls: ['./detallelibro.component.scss']
})
export class DetallelibroComponent implements OnInit {

  mostar_input_codigo = false

  // Define las variables utilizadas en el código original
  private currentSlide: number = 0;
  private slides: HTMLCollectionOf<Element> | any;
  private slideInterval: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }
}
