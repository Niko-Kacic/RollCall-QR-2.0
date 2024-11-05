import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) { }

  async login(email: string, password: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
    console.log('Usuario autenticado:', userCredential.user); 
    return userCredential.user; 
  }

  async getCurrentUser(): Promise<User | null> {
    const user = await this.afAuth.currentUser;
    console.log('Usuario actual:', user); 
    return user;
  }

  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user; 
  }
  

   async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  logout() {
    return this.afAuth.signOut();
  }
}

