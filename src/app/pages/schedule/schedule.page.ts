import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNoteComponent } from '../../components/add-note/add-note.component';

interface Note {
  date: string;
  content: string;
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  private touchTimeout: any;
  private pressDuration = 800;
  notes: Note[] = [];
  selectedDate: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.loadNotes();
  }

  onMouseDown(event: any) {
    this.touchTimeout = setTimeout(() => {
      this.selectedDate = event.target.value;
      this.openModal(this.selectedDate);
    }, this.pressDuration);
  }

  onMouseUp(event: any) {
    clearTimeout(this.touchTimeout);
  }

  async openModal(selectedDate: string = '') {
    const modal = await this.modalController.create({
      component: AddNoteComponent,
      componentProps: { selectedDate: selectedDate },
    });

    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.note) {
        console.log('Nota añadida:', result.data.note);
        this.notes.push(result.data.note);
        this.saveNotes();
      }
    });

    return await modal.present();
  }

  getNotesForSelectedDate(): Note[] {
    return this.notes.filter(note => note.date === this.selectedDate);
  }

  deleteNote(noteIndex: number) {
    console.log('Deleting note at index:', noteIndex);
    const filteredNotes = this.getNotesForSelectedDate();
    const noteToDelete = filteredNotes[noteIndex];

    this.notes = this.notes.filter(note => note !== noteToDelete);
    this.saveNotes();
    console.log('Notas después de eliminar:', this.notes);
  }

  saveNotes() {
    localStorage.setItem('notes', JSON.stringify(this.notes));
    console.log('Notas guardadas en localStorage:', this.notes);
  }

  loadNotes() {
    const notes = localStorage.getItem('notes');
    if (notes) {
      this.notes = JSON.parse(notes);
      console.log('Notas cargadas desde localStorage:', this.notes);
    } else {
      console.log('No hay notas en localStorage.');
    }
  }

  updateSelectedDate(event: any) {
    this.selectedDate = event.detail.value;
    console.log('Fecha seleccionada actualizada:', this.selectedDate);
  }
}
