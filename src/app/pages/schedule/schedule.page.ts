import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddNoteComponent } from '../../components/add-note/add-note.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async onDateChange(event: any) {
    const selectedDate = event.detail.value;
    const modal = await this.modalController.create({
      component: AddNoteComponent,
      componentProps: { selectedDate: selectedDate },
    });
    return await modal.present();
  }

  async openModal(selectedDate: string = '') {
    const modal = await this.modalController.create({
      component: AddNoteComponent,
      componentProps: { selectedDate: selectedDate },
    });
    return await modal.present();
  }
}
