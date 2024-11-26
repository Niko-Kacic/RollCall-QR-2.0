import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { ConfirmLogoutComponent } from 'src/app/components/confirm-logout/confirm-logout.component';
import { AuthService } from 'src/app/services/auth.service';
import { FireDataBaseService } from 'src/app/services/fire-data-base.service';
import { LoadingController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';
  public userName: string = '';
  darkModeEnabled: boolean = false;

  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService,
    private fireDataBaseService: FireDataBaseService,
    private modalController: ModalController,
    private loadingCtrl: LoadingController
  ) { 
    this.loadDarkModePreference();
    }

  // Obtener el nombre del usuario autenticado
  async ngOnInit() {
    const user = await this.authService.getCurrentUser();
    if (user && user.email) {
      const email = user.email;
      console.log('Correo del usuario autenticado:', email);
      this.fireDataBaseService.getUserDataByEmail(email).subscribe(data => {
        if (data && data.name) {
          this.userName = data.name;
          console.log('Nombre del usuario obtenido:', this.userName);
        } else {
          console.log('No se encontró el usuario con el correo proporcionado');
        }
      });
    } else {
      console.log('No se pudo obtener el correo del usuario autenticado');
    }
    this.loadingCtrl.dismiss();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Cargando...',
      cssClass: 'custom-loader'
    });

    loading.present();
  }

  // Modo oscuro
  async loadDarkModePreference() {
    const { value } = await Preferences.get({ key: 'dark-mode' });
    this.darkModeEnabled = value === 'true';
    this.applyDarkMode();
  }

  toggleDarkMode() {
    this.darkModeEnabled = !this.darkModeEnabled;
    Preferences.set({ key: 'dark-mode', value: String(this.darkModeEnabled) });
    this.applyDarkMode();
  }

  applyDarkMode() {
    document.body.classList.toggle('dark', this.darkModeEnabled);
  }

  redirect_profile() {
    this.showLoading();
    this.menu.close();
    this.router.navigate(['/profile']);
  }

  redirect_subjects() {
    this.menu.close();
    this.router.navigate(['/subjects']);
  }

  redirect_schedule() {
    this.menu.close();
    this.router.navigate(['/schedule'])
  }

  redirect_404() {
    this.menu.close();
    this.router.navigate(['/error-404']);
  }

  // Cerrar sesión
  async logout() {
    const modal = await this.modalController.create({
      component: ConfirmLogoutComponent
    });
    return await modal.present();
  }

}
