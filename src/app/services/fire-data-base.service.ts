import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FireDataBaseService {

  constructor(private firestore: AngularFirestore) { }

  getUserData(userId: string) {
    return this.firestore.collection('usuarios').doc(userId).valueChanges();
  }
}
