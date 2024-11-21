import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmLogoutComponent } from '../components/confirm-logout/confirm-logout.component';

@NgModule({
  declarations: [ConfirmLogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [ConfirmLogoutComponent],

})
export class SharedModule { }

