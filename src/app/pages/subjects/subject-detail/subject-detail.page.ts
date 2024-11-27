import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
  apiUrl: string = 'http://localhost:3000/courses';  

  constructor(
    private activatedrouter: ActivatedRoute,
    private http: HttpClient,
    private subjetApi: SubjectsApiService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.activatedrouter.paramMap.subscribe(paramMap => {
      const subjectId = paramMap.get('placeId');
      this.subjetApi.getSubjects().subscribe((data) => {
        this.subjects = data;
        this.subjectDetail = this.subjects.find(signature => signature.id === subjectId);
        this.subjectAsist = this.subjectDetail.asistencias;
        this.subjectPorcentage = this.subjectDetail.attendanceRate;
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
  
  incrementAttendance() {
    this.subjectAsist += 1;
    this.subjectDetail.asistencias = this.subjectAsist;

     // Actualiza la asistencia en la API
     this.http.put(`${this.apiUrl}/${this.subjectDetail.id}/asistencias`, { asistencias: this.subjectAsist })
     .subscribe(response => {
       console.log('Asistencias actualizadas:', response);
     }, error => {
       console.error('Error al actualizar asistencias:', error);
     });
 }

  calculatePercentage() {
    if (this.subjectDetail.totalClasses > 0) {
      this.subjectPorcentage = parseFloat(((this.subjectAsist / this.subjectDetail.totalClasses) * 100).toFixed(2));
      this.subjectDetail.attendanceRate = this.subjectPorcentage;

      // Actualiza el porcentaje de asistencia en la API
      this.http.put(`${this.apiUrl}/${this.subjectDetail.id}/attendanceRate`, { attendanceRate: this.subjectPorcentage })
        .subscribe(response => {
          console.log('Porcentaje de asistencia actualizado:', response);
        }, error => {
          console.error('Error al actualizar el porcentaje de asistencia:', error);
        });
    } else {
      this.subjectPorcentage = 0;
    }
  }

}
