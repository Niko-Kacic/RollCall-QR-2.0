import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})

export class MainMenuPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';


  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService
  ) { }

  redirect_profile(){
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
