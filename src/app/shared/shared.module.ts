import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmLogoutComponent } from '../components/confirm-logout/confirm-logout.component';  // Ajusta la ruta según tu estructura

@NgModule({
  declarations: [ConfirmLogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule  // Importa IonicModule aquí
  ],
  exports: [ConfirmLogoutComponent],

})
export class SharedModule { }

