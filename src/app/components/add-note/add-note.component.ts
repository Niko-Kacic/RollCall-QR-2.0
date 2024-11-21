import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
})
export class AddNoteComponent {

  @Input() selectedDate: string;
  noteContent: string;

  constructor(private modalController: ModalController) { }

  saveNote() {
    console.log('Nota guardada:', this.noteContent, 'para la fecha:', this.selectedDate);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}

