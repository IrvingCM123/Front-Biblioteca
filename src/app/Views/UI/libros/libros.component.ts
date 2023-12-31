import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { LibrosUseCase } from 'src/app/domain/Libros/client/Libros';
import { LibroService } from './Libros.Service';
import { Cache_Service } from '../services/cache.service';
import { RevistaUseCase } from 'src/app/domain/Revistas/client/Revista';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
})
export class LibrosComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private librosUseCase: LibrosUseCase,
    private libroService: LibroService,
    private cacheService: Cache_Service,
    private revistasUseCase: RevistaUseCase
  ) {}

  async ngOnInit(): Promise<void> {
    await this.ObtenerLibros();
    this.obtenerCategoriasUnicas();
    this.obtenerAutoresUnicos();
    this.obtenerEditorialesUnicas();
  }

  showProfileOptions = false;

  categoriasUnicas: string[] = [];
  autoresUnicos: string[] = [];
  editorialesUnicas: string[] = [];

  array_Libros: any;

  zindex = 10;
  isShowing = false;

  toggleProfileOptions() {
    this.showProfileOptions = !this.showProfileOptions;
  }

  async ObtenerLibros() {
    let obtenerLibros: any = await this.librosUseCase.getLibros().toPromise();
    const promises = obtenerLibros.map((isbn: any) =>
      this.libroService.getLibroByISBN(isbn)
    );
    let resultado = await Promise.all(promises);
    this.array_Libros = resultado;

    let obtenerRevistas: any = await this.revistasUseCase.getRevista().toPromise();
    const promises2 = obtenerRevistas.map((issn: any) =>
      this.libroService.getRevistaByISSN(issn)
    );
    let resultado2 = await Promise.all(promises2);
    this.array_Libros = this.array_Libros.concat(resultado2);
    console.log(this.array_Libros);
    this.addCardAnimations();
  }

  ngAfterViewInit() {
    const expandHome =
      this.elementRef.nativeElement.querySelector('.expandHome');
    const subHome = this.elementRef.nativeElement.querySelector('.sub-home');
    const subnavbtn = this.elementRef.nativeElement.querySelector('.subnavbtn');
    const trapezoid = this.elementRef.nativeElement.querySelector('#trapezoid');

    this.renderer.listen(expandHome, 'mouseover', () => {
      this.renderer.setStyle(subHome, 'display', 'block');
    });

    this.renderer.listen(subnavbtn, 'mouseover', () => {
      this.renderer.setStyle(subHome, 'display', 'none');
    });

    this.renderer.listen(trapezoid, 'mouseleave', () => {
      this.renderer.setStyle(trapezoid, 'margin-top', '-53px');
      this.renderer.setStyle(subHome, 'display', 'none');
    });

    this.renderer.listen(trapezoid, 'mouseenter', () => {
      this.renderer.setStyle(trapezoid, 'margin-top', '0px');
    });
  }

  obtenerCategoriasUnicas(): void {
    this.array_Libros.forEach((book: any) => {
      if (book.Genero && !this.categoriasUnicas.includes(book.Genero)) {
        this.categoriasUnicas.push(book.Genero);
      }
    });
  }

  obtenerAutoresUnicos(): void {
    this.array_Libros.forEach((book: any) => {
      if (book.Autor && !this.autoresUnicos.includes(book.Autor)) {
        this.autoresUnicos.push(book.Autor);
      }
    });
  }

  obtenerEditorialesUnicas(): void {
    this.array_Libros.forEach((book: any) => {
      if (book.Editorial && !this.editorialesUnicas.includes(book.Editorial)) {
        this.editorialesUnicas.push(book.Editorial);
      }
    });
  }
  addCardAnimations() {
    setTimeout(() => {
      const cardElements: any =
        this.elementRef.nativeElement.querySelectorAll('.card');
      console.log(cardElements);
      cardElements.forEach((cardElement: any) => {
        this.renderer.listen(cardElement, 'click', (event: Event) => {
          event.preventDefault();

          const cardsElement: any =
            this.elementRef.nativeElement.querySelector('.cards');
          this.isShowing = cardElement.classList.contains('show');

          if (cardsElement.classList.contains('showing')) {
            const showingCard =
              this.elementRef.nativeElement.querySelector('.card.show');
            if (showingCard) {
              showingCard.classList.remove('show');
            }

            if (this.isShowing) {
              cardsElement.classList.remove('showing');
            } else {
              this.renderer.setStyle(
                cardElement,
                'z-index',
                this.zindex.toString()
              );
              cardElement.classList.add('show');
            }

            this.zindex++;
          } else {
            cardsElement.classList.add('showing');
            this.renderer.setStyle(
              cardElement,
              'z-index',
              this.zindex.toString()
            );
            cardElement.classList.add('show');
            this.zindex++;
          }
        });
      });
    }, 1000);
  }

  buscarLibro(id_libro: any) {
    let id = this.array_Libros[id_libro].ISBN || this.array_Libros[id_libro].ISSN;
    console.log(id);
    this.cacheService.guardar_DatoLocal('id_libro', id);
  }

}
