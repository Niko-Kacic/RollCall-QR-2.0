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
    const note = {
      date: this.selectedDate,
      content: this.noteContent
    };
    this.modalController.dismiss({ note: note });
  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
