import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';
import { FireDataBaseService } from 'src/app/services/fire-data-base.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private toastController: ToastController,
    private auth: Auth,
    private authService: AuthService,
    fireDataBaseService: FireDataBaseService
  ) { }


  email!: string;
  password!: string;
  showPassword: boolean = false;
  name:string = "";
  public footerTitle: string = '{ Code By CodeCrafters }';


  async validateLogin() {
    try {
      const user = await this.authService.login(this.email, this.password);
      if (user) {
        this.toastMessage('Usuario autenticado correctamente', 'success');
        this.router.navigate(['/main-menu']); // Redirige a una ruta protegida después del login
        this.email = "";
        this.password = "";
      }
    } catch (error: any) {
      this.toastMessage('Error al autenticar: ' + error.message, 'danger');
      this.email = "";
      this.password = "";
    }
  }

  isAuthenticated(): boolean {
    return this.auth.currentUser !== null;
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

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  ngOnInit() {
  }

}
