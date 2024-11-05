import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})

export class MainMenuPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';


  constructor(
    private menu: MenuController,
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) { }

  redirect_profile(){
    this.menu.close();
    this.router.navigate(['/profile']);
  };

  redirect_subjects(){
    this.menu.close();
    this.router.navigate(['/subjects']);
  };

  async toastMessage(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  async logout() {
    await this.authService.logout(); 
    this.toastMessage('Se ha cerrado su sesión correctamente', 'success');
    this.router.navigate(['/login']); 
  }

  ngOnInit() {

  }

}
