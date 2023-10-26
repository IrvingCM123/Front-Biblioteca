import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as firebase from 'firebase/compat';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LibroService {
  constructor(private firestore: AngularFirestore) { }


  async getLibroByISBN(isbn: string) {

    try {
      const documento: any = await this.firestore.collection('Libros').doc(isbn).get().toPromise();

      if (documento.exists) {
        console.log('Se obtuvo la información de Firestore:', documento.data());
        return documento.data();
      } else {
        console.log('No se encontró el libro con ISBN:', isbn);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la información de Firestore:', error);
      return null;
    }
  }

  async getRevistaByISSN(issn: string) {
    try {
      const documento: any = await this.firestore.collection('Revistas').doc(issn).get().toPromise();

      if (documento.exists) {
        console.log('Se obtuvo la información de Firestore:', documento.data());
        return documento.data();
      } else {
        console.log('No se encontró la revista con ISSN:', issn);
        return null;
      }
    } catch (error) {
      console.error('Error al obtener la información de Firestore:', error);
      return null;
    }
  }

}
