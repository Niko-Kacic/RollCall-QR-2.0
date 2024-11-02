import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private toastController: ToastController,
    private auth: Auth
  ) { }


  email!: string;
  password!: string;
  public footerTitle: string = '{ Code By CodeCrafters }';


  async validateLogin() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);

      if (userCredential.user) {

        let extras: NavigationExtras = {
          state: {
            user: this.email
          }
        };
        this.toastMessage('Usuario autenticado correctamente', 'success');
        this.router.navigate(['/home-user'], extras);

        this.email = "";
        this.password = "";

      }
    } catch (error: any) {

      this.toastMessage('Error al autenticar: ' + error.message, 'danger');

      this.email = "";
      this.password = "";
    }
  }


  async toastMessage(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  redirect(){
    this.router.navigate(['/reset-password']);
  };

  ngOnInit() {
  }

}
