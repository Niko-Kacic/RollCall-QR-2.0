import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsApiService } from 'src/app/services/subjects-api.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ToastController } from '@ionic/angular';
// import { AssistanceService } from '../../../services/assistance.service'; // Importa el nuevo servicio

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.page.html',
  styleUrls: ['./subject-detail.page.scss'],
})
export class SubjectDetailPage implements OnInit {

  subjectDetail: any;
  subjects: any[] = [];
  result: string = '';
  subjectAsist: number = 0;
  subjectPorcentage: number = 0;
  public footerTitle: string = '{ Code By CodeCrafters }';

  constructor(
    private activatedrouter: ActivatedRoute,
    private subjetApi: SubjectsApiService,
    private toastController: ToastController,
    // private firestoreService: AssistanceService // Agrega el servicio al constructor
  ) { }

  ngOnInit() {
    this.activatedrouter.paramMap.subscribe(paramMap => {
      const subjectId = paramMap.get('placeId');
      this.subjetApi.getSubjects().subscribe((data) => {
        this.subjects = data;
        this.subjectDetail = this.subjects.find(signature => signature.id === subjectId);
        console.log(this.subjectDetail);
      });
    });
  }

  async toastMessage(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    toast.present();
  }

  async openCamera(): Promise<void> {
    const result = await CapacitorBarcodeScanner.scanBarcode({
      hint: CapacitorBarcodeScannerTypeHint.ALL
    });
    this.result = result.ScanResult;

    if (this.result) {
      // this.incrementAttendance();
      this.calculatePercentage();
      this.toastMessage('Se ha escaneado con exito el código QR!', 'success');
    } else {
      this.toastMessage('Escaneo fallido. Intente nuevamente.', 'danger');
    }
  }

  /*
  incrementAttendance() {
    this.subjectAsist += 1;
    this.subjectDetail.attendance = this.subjectAsist;

    // Actualiza la asistencia en Firestore
    this.firestoreService.updateAssistance(this.subjectDetail.id, this.subjectAsist).then(() => {
      console.log('Asistencia actualizada en Firestore');
    }).catch(error => {
      console.error('Error al actualizar la asistencia en Firestore:', error);
    });
  }
  */

  calculatePercentage() {
    if (this.subjectDetail.totalClasses > 0) {
      this.subjectPorcentage = parseFloat(((this.subjectAsist / this.subjectDetail.totalClasses) * 100).toFixed(2));
    } else {
      this.subjectPorcentage = 0;
    }
  }
}
