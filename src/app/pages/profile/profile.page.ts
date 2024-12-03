import { Component, OnInit } from '@angular/core';
import { FireDataBaseService } from 'src/app/services/fire-data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';
  firstName: string = "";
  lastname: string = "";
  email: string = "";
  careerSemester: string = "";
  headquarters: string = "";
  school: string = "";
  career: string = "";
  yearAtending: string = "";
  profileImage: string | null = null;

  constructor(
    private fireDataBaseService: FireDataBaseService,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {

    const user = await this.authService.getCurrentUser();
    this.loadProfileImage();
    if (user && user.email) {
      
      this.email = user.email;
      console.log('Correo del usuario autenticado:', this.email); 

      this.fireDataBaseService.getUserDataByEmail(this.email).subscribe(data => {
        if (data) {
          console.log('Datos del usuario obtenidos desde Firestore:', data); 
          this.lastname = data['lastname'];
          this.firstName = data['name'];
          this.email = data['email'];
          this.careerSemester = data['careerSemester'];
          this.headquarters = data['headquarters'];
          this.school = data['school'];
          this.career = data['career'];
          this.yearAtending = data['yearAtending'];
        } else {
          console.log('No se encontró el usuario con el correo proporcionado');
        }
      });
    } else {
      console.log('No se pudo obtener el correo del usuario autenticado');

    }
  }

  async changeProfileImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    });
    if (image) {
      const base64Data = await this.readAsBase64(image);
      const fileName = `profile_image.jpeg`; 
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });
      this.profileImage = image.webPath || null; 
    }
  }
  private async readAsBase64(image: any): Promise<string> {
    const response = await fetch(image.webPath!);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
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
    }
  }
}


