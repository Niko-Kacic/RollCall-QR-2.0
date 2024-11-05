import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Ajusta el método para devolver un Promise<User | null>
  async getCurrentUser(): Promise<User | null> {
    return await this.afAuth.currentUser;
  }

  logout() {
    return this.afAuth.signOut();
  }
}

