import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
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
  currentMonth: Date = new Date();

  constructor(private modalController: ModalController, private alertController: AlertController) {}

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

  async deleteNoteConfirmation(noteIndex: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: '¿Estás seguro de que deseas eliminar esta nota?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Eliminar cancelado');
          }
        }, {
          text: 'Eliminar',
          handler: () => {
            this.deleteNote(noteIndex);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteNote(noteIndex: number) {
    console.log('Deleting note at index:', noteIndex);
    const filteredNotes = this.getNotesForSelectedDate();
    const noteToDelete = filteredNotes[noteIndex];

    this.notes = this.notes.filter(note => note !== noteToDelete);
    this.saveNotes();
    console.log('Notas después de eliminar:', this.notes);
  }

  hasNotes(date: Date): boolean {
    const dateString = date.toISOString().split('T')[0];
    return this.notes.some(note => note.date === dateString);
  }

  getDaysInMonth(): Date[] {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
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
