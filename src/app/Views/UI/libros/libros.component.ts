import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { LibrosUseCase } from 'src/app/domain/Libros/client/Libros';
import { LibroService } from './Libros.Service';
@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
})
export class LibrosComponent implements OnInit {

  constructor(private renderer: Renderer2,
    private elementRef: ElementRef,
    private librosUseCase: LibrosUseCase,
    private libroService: LibroService
  ) { }


  ngOnInit(): void {
    this.ObtenerLibros();
    this.obtenerCategoriasUnicas();
    this.obtenerAutoresUnicos();
    this.obtenerEditorialesUnicas();
  }

  showProfileOptions = false;

  categoriasUnicas: string[] = [];
  autoresUnicos: string[] = [];
  editorialesUnicas: string[] = [];

  array_Libros: any[] | string[] = [];

  zindex = 10;
  isShowing = false;

  toggleProfileOptions() {
    this.showProfileOptions = !this.showProfileOptions;
  }

  ObtenerLibros() {
    this.librosUseCase.getLibros().subscribe(async (res) => {
      console.log(res);
      const promises = res.map(async (isbn: any) => await this.libroService.getLibroByISBN(isbn));
      this.array_Libros = await Promise.all(promises);
    });
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

    const cardElements: any =
      this.elementRef.nativeElement.querySelectorAll('.card');

    cardElements.forEach(
      (cardElement: {
        classList: {
          contains: (arg0: string) => boolean;
          add: (arg0: string) => void;
        };
      }) => {
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
      }
    );
  }

  obtenerCategoriasUnicas(): void {
    this.array_Libros.forEach((book) => {
      if (book.Genero && !this.categoriasUnicas.includes(book.Genero)) {
        this.categoriasUnicas.push(book.Genero);
      }
    });
  }

  obtenerAutoresUnicos(): void {
    this.array_Libros.forEach((book) => {
      if (book.Autor && !this.autoresUnicos.includes(book.Autor)) {
        this.autoresUnicos.push(book.Autor);
      }
    });
  }

  obtenerEditorialesUnicas(): void {
    this.array_Libros.forEach((book) => {
      if (book.Editorial && !this.editorialesUnicas.includes(book.Editorial)) {
        this.editorialesUnicas.push(book.Editorial);
      }
    });
  }
}
