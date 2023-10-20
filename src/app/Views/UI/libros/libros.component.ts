import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss'],
})
export class LibrosComponent implements OnInit {
  ngOnInit(): void {
    this.obtenerCategoriasUnicas();
    this.obtenerAutoresUnicos();
    this.obtenerEditorialesUnicas();
  }

  showProfileOptions = false;

  categoriasUnicas: string[] = [];
  autoresUnicos: string[] = [];
  editorialesUnicas: string[] = [];

  zindex = 10;
  isShowing = false;

  toggleProfileOptions() {
    this.showProfileOptions = !this.showProfileOptions;
  }

  books: any[] = [
    // Definir una propiedad 'books' con datos de libros
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 1',
      description: 'Descripción del Libro 1',
      categoria: 'fantasia',
      autor: 'autor 1',
      editorial: 'editorial 1',
      id: 1,
    },
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 2',
      description: 'Descripción del Libro 2',
      categoria: 'accion',
      autor: 'autor 2',
      editorial: 'editorial 2',
      id: 2,
    },
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 3',
      description: 'Descripción del Libro 3',
      categoria: 'romance',
      autor: 'autor 3',
      editorial: 'editorial 3',
      id: 3,
    },
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 4',
      description: 'Descripción del Libro 1',
      categoria: 'historia',
      autor: 'autor 4',
      editorial: 'editorial 4',
      id: 4,
    },
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 5',
      description: 'Descripción del Libro 2',
      categoria: 'cultural',
      autor: 'autor 5',
      editorial: 'editorial 5',
      id: 5,
    },
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 6',
      description: 'Descripción del Libro 3',
      categoria: 'asesinos',
      autor: 'autor 6',
      editorial: 'editorial 6',
      id: 6,
    },
    {
      imageUrl:
        'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 7',
      description: 'Descripción del Libro 3',
      categoria: 'espacio',
      autor: 'autor 7',
      editorial: 'editorial 7',
      id: 7,
    },
  ];

  verLibro(bookId: number) {
    // Definir el método 'verLibro'
    // Lógica para ver el libro con bookId
  }

  // Otras propiedades y métodos de tu componente.

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

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
    this.books.forEach((book) => {
      if (book.categoria && !this.categoriasUnicas.includes(book.categoria)) {
        this.categoriasUnicas.push(book.categoria);
      }
    });
  }

  obtenerAutoresUnicos(): void {
    this.books.forEach((book) => {
      if (book.autor && !this.autoresUnicos.includes(book.autor)) {
        this.autoresUnicos.push(book.autor);
      }
    });
  }

  obtenerEditorialesUnicas(): void {
    this.books.forEach((book) => {
      if (book.editorial && !this.editorialesUnicas.includes(book.editorial)) {
        this.editorialesUnicas.push(book.editorial);
      }
    });
  }
}
