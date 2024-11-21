import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Auth, getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email!: string;
  public footerTitle: string = '{ Code By CodeCrafters }';

  constructor(
    private toastController: ToastController,
    private router: Router,
    private auth: Auth,  // Asegúrate de que Auth es importado de @angular/fire/compat/auth
    private loadingCtrl: LoadingController
  ) {}

  resetPassword() {
    if (!this.email) {
      this.toastMessage("Por favor ingresa tu correo", 'danger');
      return;
    }

    this.showLoading();
    const auth = getAuth();
    sendPasswordResetEmail(auth, this.email)
      .then(() => {
        this.loadingCtrl.dismiss();
        this.toastMessage("Correo de recuperación enviado", 'success');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        this.loadingCtrl.dismiss();
        this.toastMessage("Error al enviar el correo: " + error.message, 'danger');
      });
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

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Gestionando solicitud...',
      cssClass: 'custom-loader'
    });

    loading.present();
  }
}

