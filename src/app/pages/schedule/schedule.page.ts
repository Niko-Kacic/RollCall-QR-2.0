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
  note: Note[] = [];
  selectDate: string;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onMouseDown(event: any) {
    this.touchTimeout = setTimeout(() => {
      const selectedDate = event.target.value;
      this.openModal(selectedDate);
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
    return await modal.present();
  }

  getNotesForSelectedDate(): Note[]{
    return this.note.filter(note => note.date === this.selectDate);
  }
}
