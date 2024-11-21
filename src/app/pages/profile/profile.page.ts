import { Component, OnInit } from '@angular/core';
import { FireDataBaseService } from 'src/app/services/fire-data-base.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';

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

  constructor(
    private fireDataBaseService: FireDataBaseService,
    private authService: AuthService,
    private loadingCtrl: LoadingController
  ) {}

  async ngOnInit() {

    // Espera a que se resuelva el usuario autenticado
    const user = await this.authService.getCurrentUser();
    if (user && user.email) {
      
      this.email = user.email;
      console.log('Correo del usuario autenticado:', this.email); // Verifica el correo obtenido

      // Buscar los datos del usuario por el correo
      this.fireDataBaseService.getUserDataByEmail(this.email).subscribe(data => {
        if (data) {
          this.loadingCtrl.dismiss();
          console.log('Datos del usuario obtenidos desde Firestore:', data); // Verifica los datos obtenidos
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

}


