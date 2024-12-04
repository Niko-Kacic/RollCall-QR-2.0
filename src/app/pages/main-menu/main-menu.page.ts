import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { ConfirmLogoutComponent } from 'src/app/components/confirm-logout/confirm-logout.component';
import { AuthService } from 'src/app/services/auth.service';
import { FireDataBaseService } from 'src/app/services/fire-data-base.service';
import { Preferences } from '@capacitor/preferences';
import { PhraseService } from 'src/app/services/phrase.service'; 
import { Phrase } from 'src/app/services/phrase.service'; 
import { Filesystem, Directory } from '@capacitor/filesystem'; 
import { ToastController } from '@ionic/angular'; 

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';
  public userName: string = '';
  darkModeEnabled: boolean = false;
  phrase: string = '';
  author: string = '';  
  profileImage: string | null = null;
  loadingPhrase: boolean = true;

  constructor(
    private menu: MenuController,
    private router: Router,
    private authService: AuthService,
    private fireDataBaseService: FireDataBaseService,
    private modalController: ModalController,
    private phraseService: PhraseService,
    private toastController: ToastController
  ) { 
    this.loadDarkModePreference();
    this.loadProfileImage();
    }

  // Toast de función no disponible
  async showComingSoonToast() {
    const toast = await this.toastController.create({
      message: 'Esta función no está lista aún. ¡Vuelve pronto!',
      duration: 3000, 
      position: 'bottom', 
      color: 'tertiary' 
    });
    await toast.present();
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
  
    // Llamada al servicio para obtener frase motivacional
    this.phraseService.getPhrase().subscribe((phrases: Phrase[]) => {
      if (phrases && phrases.length > 0) {
        const randomIndex = Math.floor(Math.random() * phrases.length);
        const randomPhrase = phrases[randomIndex];
        
        this.phrase = randomPhrase.phrase;
        this.author = randomPhrase.author;
      }
      
      this.loadingPhrase = false; 
    }, (error) => {
      console.log('Error al obtener la frase:', error);
      this.loadingPhrase = false;
    });
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

  // Cargar imagen de perfil
  async loadProfileImage() {
    try {
      const fileName = `profile_image.jpeg`;
      const file = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data,
      });
      this.profileImage = `data:image/jpeg;base64,${file.data}`;
    } catch (error) {
      console.log('No se encontró una imagen guardada.');
      this.profileImage = 'https://freesvg.org/img/abstract-user-flat-4.png'; 
    }
  }

  // Redirecciones
  redirect_profile() {
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

  redirect_news() {
    this.menu.close();
    this.router.navigate(['/news']);
  }

  // Llamado al toast de función no disponible
  comingSoon() {
    this.showComingSoonToast();
  }

  // Cerrar sesión
  async logout() {
    this.menu.close();
  
    const modal = await this.modalController.create({
      component: ConfirmLogoutComponent,
    });
    
    await modal.present();

    const { data } = await modal.onWillDismiss();

    if (data && data.confirmed) {
      try {
        await this.authService.logout();
        console.log('Sesión cerrada exitosamente.');
      
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  }
}
