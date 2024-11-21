import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ConfirmLogoutComponent } from '../components/confirm-logout/confirm-logout.component';
import { AddNoteComponent } from '../components/add-note/add-note.component';

@NgModule({
  declarations: [
    ConfirmLogoutComponent,
    AddNoteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports: [
    ConfirmLogoutComponent,
    AddNoteComponent
  ],

})
export class SharedModule { }

