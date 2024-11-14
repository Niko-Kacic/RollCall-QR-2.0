import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { FireDataBaseService } from 'src/app/services/fire-data-base.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';
  public userName: string = ''; // Variable para almacenar el nombre del usuario

  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService,
    private fireDataBaseService: FireDataBaseService
  ) { }

  async ngOnInit() {
    // Obtener el usuario autenticado
    const user = await this.authService.getCurrentUser();
    if (user && user.email) {
      const email = user.email;
      console.log('Correo del usuario autenticado:', email); // Verifica el correo

      // Obtener los datos del usuario a partir de su correo
      this.fireDataBaseService.getUserDataByEmail(email).subscribe(data => {
        if (data && data.name) {
          this.userName = data.name; // Asignar el nombre del usuario a la variable
          console.log('Nombre del usuario obtenido:', this.userName); // Verificar el nombre
        } else {
          console.log('No se encontró el usuario con el correo proporcionado');
        }
      });
    } else {
      console.log('No se pudo obtener el correo del usuario autenticado');
    }
  }

  redirect_profile() {
    this.router.navigate(['/profile']);
  }

  redirect_subjects() {
    this.menu.close();
    this.router.navigate(['/subjects']);
  }

  redirect_404() {
    this.menu.close();
    this.router.navigate(['/error-404']);
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);  // Redirige al usuario a la página de login después de cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
