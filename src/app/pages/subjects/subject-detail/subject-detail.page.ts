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
  isLoading = true;
  subjectDetail: any;
  subjects: any[] = [];
  subjectAsist = 0;
  subjectPercentage = 0;
  isModalOpen = false;
  currentDate = '';
  currentTime = '';
  readonly apiUrl = 'https://signature-api-production.up.railway.app/courses';

  constructor(
    private activatedRouter: ActivatedRoute,
    private http: HttpClient,
    private subjectApi: SubjectsApiService,
    private toastController: ToastController,
    private qrScannerService: QrScannerService
  ) {}

  async ngOnInit() {
    await this.loadSubjectDetail();
  
    const initialized = await this.qrScannerService.init();
    if (!initialized) {
      this.toastMessage('No se pudo inicializar el escáner.', 'danger');
    }
  }
  
  async loadSubjectDetail() {
    this.isLoading = true;
    const subjectId = this.activatedRouter.snapshot.paramMap.get('placeId');

    this.subjectApi.getSubjects().subscribe(
      (data) => {
        this.subjects = data;
        this.subjectDetail = this.subjects.find((signature) => signature.id === subjectId);

        if (this.subjectDetail) {
          this.subjectAsist = this.subjectDetail.asistencias || 0;
          this.subjectPercentage = this.subjectDetail.attendanceRate || 0;
        } else {
          this.toastMessage('No se encontró la asignatura solicitada.', 'danger');
        }

        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar detalles de la asignatura:', error);
        this.toastMessage('Error al cargar datos. Verifica la conexión.', 'danger');
        this.isLoading = false;
      }
    );
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
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  async scan() {
  const barcodes = await this.qrScannerService.scan();
  if (barcodes.length === 0) {
    this.toastMessage('No se detectaron códigos QR.', 'danger');
    return;
  }

  const scannedCode = barcodes[0];
  console.log('Código escaneado:', scannedCode); 
  if (this.subjectDetail && scannedCode.includes(this.subjectDetail.section)) {
    this.incrementAttendance();
    this.toastMessage('Asistencia registrada con éxito.', 'success');
    this.openModal();
  } else {
    this.toastMessage('El QR no corresponde a la sección esperada.', 'danger');
  }
}


  incrementAttendance() {
    this.subjectAsist++;
    this.subjectPercentage = this.calculateAttendancePercentage();

    this.http
      .put(`${this.apiUrl}/${this.subjectDetail.id}`, {
        asistencias: this.subjectAsist,
        attendanceRate: this.subjectPercentage,
      })
      .subscribe(
        () => {
          this.toastMessage('Asistencia actualizada con éxito.', 'success');
          this.loadSubjectDetail();
        },
        (error) => {
          console.error('Error al actualizar los datos:', error);
          this.toastMessage('Error al actualizar los datos.', 'danger');
        }
      );
  }

  calculateAttendancePercentage(): number {
    return this.subjectDetail.totalClasses > 0
      ? parseFloat(((this.subjectAsist / this.subjectDetail.totalClasses) * 100).toFixed(2))
      : 0;
  }

  resetCourses() {
    this.http.post(`${this.apiUrl}/reset-courses`, {}).subscribe(
      () => {
        this.toastMessage('Cursos restablecidos a sus valores por defecto.', 'success');
        this.loadSubjectDetail();
      },
      (error) => {
        console.error('Error al restablecer los cursos:', error);
        this.toastMessage('Error al restablecer los cursos.', 'danger');
      }
    );
  }
}
