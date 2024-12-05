import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SubjectsApiService } from 'src/app/services/subjects-api.service';
import { ToastController } from '@ionic/angular';
import { QrScannerService } from 'src/app/services/qr-scanner.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.page.html',
  styleUrls: ['./subject-detail.page.scss'],
})
export class SubjectDetailPage implements OnInit {
  isLoading: boolean = true;
  subjectDetail: any;
  subjects: any[] = [];
  result: string = '';
  subjectAsist: number = 0;
  subjectPorcentage: number = 0;
  apiUrl: string = 'https://signature-api-production.up.railway.app/courses';
  public footerTitle: string = '{ Code By CodeCrafters }';
  isModalOpen: boolean = false;
  currentDate: string = '';
  currentTime: string = '';
  interval: any;

  constructor(
    private activatedrouter: ActivatedRoute,
    private http: HttpClient,
    private subjetApi: SubjectsApiService,
    private toastController: ToastController,
    private readonly qrScannerService: QrScannerService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.activatedrouter.paramMap.subscribe((paramMap) => {
      const subjectId = paramMap.get('placeId');
      this.subjetApi.getSubjects().subscribe(
        (data) => {
          this.subjects = data;
          this.subjectDetail = this.subjects.find(
            (signature) => signature.id === subjectId
          );
          this.subjectAsist = this.subjectDetail.asistencias;
          this.subjectPorcentage = this.subjectDetail.attendanceRate;
          console.log(this.subjectDetail);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al cargar asignaturas:', error);
          this.isLoading = false;
        }
      );
    });
  }

  openModal() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
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

  async scan(): Promise<void> {
    await this.qrScannerService.init();  // Inicializa el escáner y verifica compatibilidad

    const barcodes = await this.qrScannerService.scan();
    if (barcodes.length > 0) {
      const scannedCode = barcodes[0];
      if (scannedCode.includes(this.subjectDetail.section)) {
        this.incrementAttendance();
        this.calculatePercentage();
        this.toastMessage('Asistencia registrada con éxito.', 'success');
        this.openModal();
      } else {
        this.toastMessage('El QR no corresponde a la sección esperada.', 'danger');
      }
    }
  }

  incrementAttendance() {
    this.subjectAsist += 1;
    this.subjectDetail.asistencias = this.subjectAsist;

    this.http.put(`${this.apiUrl}/${this.subjectDetail.id}/asistencias`, { asistencias: this.subjectAsist })
      .subscribe(response => {
        console.log('Asistencias actualizadas:', response);

        this.subjetApi.getSubjects().subscribe((data) => {
          this.subjects = data;
          this.subjectDetail = this.subjects.find(signature => signature.id === this.subjectDetail.id);
          this.subjectAsist = this.subjectDetail.asistencias;
          this.subjectPorcentage = this.subjectDetail.attendanceRate;
        });
      }, error => {
        console.error('Error al actualizar asistencias:', error);
        this.toastMessage('Error al actualizar asistencias. Verifica la conexión y URL.', 'danger');
      });
  }

  calculatePercentage() {
    if (this.subjectDetail.totalClasses > 0) {
      this.subjectPorcentage = parseFloat(
        ((this.subjectAsist / this.subjectDetail.totalClasses) * 100).toFixed(0)
      );
      this.subjectDetail.attendanceRate = this.subjectPorcentage;

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

  resetCourses() {
    this.http.post('https://signature-api-production.up.railway.app/reset-courses', {})
      .subscribe(response => {
        console.log('Cursos restablecidos:', response);
        this.toastMessage('Cursos restablecidos a sus valores por defecto', 'success');

        this.subjetApi.getSubjects().subscribe((data) => {
          this.subjects = data;
          this.subjectDetail = this.subjects.find(signature => signature.id === this.subjectDetail.id);
          this.subjectAsist = this.subjectDetail.asistencias;
          this.subjectPorcentage = this.subjectDetail.attendanceRate;
        });
      }, error => {
        console.error('Error al restablecer los cursos:', error);
        this.toastMessage('Error al restablecer los cursos. Verifica la conexión y URL.', 'danger');
      });
  }
}
