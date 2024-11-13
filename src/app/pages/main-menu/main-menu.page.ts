import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})

export class MainMenuPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';
  darkModeEnabled: boolean = false;

  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService
  ) {
    this.loadDarkModePreference();
   }

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


  redirect_profile(){
    this.menu.close();
    this.router.navigate(['/profile']);
  };

  redirect_subjects(){
    this.menu.close();
    this.router.navigate(['/subjects']);
  };
  redirect_404(){
    this.menu.close();
    this.router.navigate(['/error-404']);
  };

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);  // Redirige al usuario a la página de login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  ngOnInit() {

  }

}
