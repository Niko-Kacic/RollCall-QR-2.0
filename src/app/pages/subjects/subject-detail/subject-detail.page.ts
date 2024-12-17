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
  items: string[] = [];
  isLoading = true;
  subjectDetail: any;
  subjects: any[] = [];
  subjectAsist: number = 0;
  subjectPorcentage: number = 0;
  isModalOpen: boolean = false;
  currentDate: string = '';    
  currentTime: string = '';
  readonly apiUrl = 'https://signature-api-production.up.railway.app/courses';

  constructor(
    private activatedRouter: ActivatedRoute,
    private http: HttpClient,
    private subjectApi: SubjectsApiService,
    private toastController: ToastController,
    private qrScannerService: QrScannerService
  ) {}

  async ngOnInit() {
    this.loadSubjectDetails();
  
    const initialized = await this.qrScannerService.init();
    if (!initialized) {
      this.toastMessage('No se pudo inicializar el escáner.', 'danger');
    }
  }
  
  // Método para cargar los detalles de la asignatura
  loadSubjectDetails() {
    this.activatedRouter.paramMap.subscribe(paramMap => {
      const subjectId = paramMap.get('placeId');
      this.subjectApi.getSubjects().subscribe((data) => {
        console.log('Datos recibidos de la API:', data);
        this.subjects = data;
        this.subjectDetail = this.subjects.find(signature => signature.id === subjectId);
  
        if (this.subjectDetail) {
          this.subjectAsist = this.subjectDetail.asistencias;
          this.subjectPorcentage = this.subjectDetail.attendanceRate;
        } else {
          console.error('No se encontró el curso con ID:', subjectId);
        }
        this.isLoading = false; 
      }, error => {
        console.error('Error al obtener los cursos:', error);
        this.toastMessage('Error al cargar los cursos.', 'danger');
        this.isLoading = false;
      });
    });
  }

  // Método para recargar la página
  handleRefresh(event: any) {
    console.log('Página recargando...');

    this.loadSubjectDetails();

    setTimeout(() => {
      event.target.complete();
      console.log('Página recargada.');
    }, 500); 
  }

  // Métodos para abrir y cerrar el modal
  openModal() {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // Método para mostrar mensajes emergentes
  async toastMessage(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      position: 'bottom',
      color,
    });
    toast.present();
  }

  // Método para escanear el código qr
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

  // Método para incrementar la asistencia
  incrementAttendance() {
    this.subjectAsist += 1;
    this.subjectDetail.asistencias = this.subjectAsist;

    this.http.put(`${this.apiUrl}/${this.subjectDetail.id}/asistencias`, { asistencias: this.subjectAsist })
      .subscribe(response => {
        console.log('Asistencias actualizadas:', response);

        this.calculatePercentage();

        this.subjectApi.getSubjects().subscribe((data) => {
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

  // Método para calcular el porcentaje de asistencia
  calculatePercentage() {
    if (this.subjectDetail.totalClasses > 0) {
      this.subjectPorcentage = Math.round((this.subjectAsist / this.subjectDetail.totalClasses) * 100);
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

  // Método para restablecer los cursos a sus valores por defecto
  resetCourses() {
    this.http.post('https://signature-api-production.up.railway.app/reset-courses', {})
      .subscribe(response => {
        console.log('Cursos restablecidos:', response);
        this.toastMessage('Cursos restablecidos a sus valores por defecto', 'success');

        
        this.subjectApi.getSubjects().subscribe((data) => {
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
