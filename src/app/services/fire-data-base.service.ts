import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FireDataBaseService {

  constructor(private firestore: AngularFirestore) { }

  // Nueva función para obtener datos del usuario por correo
  getUserDataByEmail(email: string): Observable<any> {
    console.log('Consultando Firestore con el correo:', email); // Verifica el correo usado en la consulta
    return this.firestore.collection('estudiantes', ref => ref.where('email', '==', email))
      .valueChanges()
      .pipe(
        map(users => {
          console.log('Resultado de la consulta:', users); // Verifica el resultado de la consulta
          return users[0];
        })
      );
  }
}

