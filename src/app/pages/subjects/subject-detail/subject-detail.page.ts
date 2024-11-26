import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsApiService } from 'src/app/services/subjects-api.service';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';
import { ToastController } from '@ionic/angular';

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
    private toastController: ToastController
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
      this.incrementAttendance();
      this.calculatePercentage();
      this.toastMessage('Se ha escaneado con exito el código QR!', 'success');
    } else {
      this.toastMessage('Escaneo fallido. Intente nuevamente.', 'danger');
    }
  }

  incrementAttendance() {
    this.subjectAsist += 1;
    // Suponiendo que subjectDetail es el objeto que contiene la info de la asignatura actual
    this.subjectDetail.attendance = this.subjectAsist;
  }

  calculatePercentage() {
    if (this.subjectDetail.totalClasses > 0) {
      this.subjectPorcentage = parseFloat(((this.subjectAsist / this.subjectDetail.totalClasses) * 100).toFixed(2));
    } else {
      this.subjectPorcentage = 0;
    }
  }

}
