import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rentar',
  templateUrl: './rentar.component.html',
  styleUrls: ['./rentar.component.scss']
})
export class RentarComponent implements OnInit {

  showProfileOptions: boolean = false;

  books = [
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 1',
      description: 'Descripción del Libro 1',
      id: 1
    },
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 2',
      description: 'Descripción del Libro 2',
      id: 2
    },
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 3',
      description: 'Descripción del Libro 3',
      id: 3
    },
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 4',
      description: 'Descripción del Libro 1',
      id: 4
    },
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 5',
      description: 'Descripción del Libro 2',
      id: 5
    },
    {
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/calculadora-93291.appspot.com/o/autos-servicio-img%2Fresident-evil-4-remake-4-641d7cbabe5bb.jpg?alt=media&token=b6779c02-b694-4888-a40e-617b8563f4d3', // Agrega la URL de la imagen aquí
      title: 'Libro 6',
      description: 'Descripción del Libro 3',
      id: 6
    }

    // Agrega más libros aquí...
  ];
  constructor() { }

  ngOnInit(): void {
  }
  
  verLibro(bookId: number) {
    // Lógica para mostrar los detalles del libro
    // Puedes redirigir a una página de detalles o implementar la lógica deseada.
  }

  comprarRentarLibro(bookId: number) {
    // Lógica para comprar o rentar el libro
    // Puedes redirigir a una página de compra/renta o implementar la lógica deseada.
  }

  toggleProfileOptions() {
    // Lógica para mostrar/ocultar opciones de perfil
    // Puedes implementar esta funcionalidad según tus necesidades.
  }
}

