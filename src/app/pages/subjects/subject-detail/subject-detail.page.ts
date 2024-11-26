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
    // Captura el id de la URL
    this.activatedrouter.paramMap.subscribe(paramMap => {
      const subjectId = paramMap.get('placeId'); // Obtén el id de la asignatura

      // Llama al servicio para obtener todas las asignaturas
      this.subjetApi.getSubjects().subscribe((data) => {
        this.subjects = data;

        // Encuentra la asignatura que coincide con el id
        this.subjectDetail = this.subjects.find(signature => signature.id === subjectId);

        console.log(this.subjectDetail); // Verifica que hayas obtenido la asignatura correcta
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
      this.toastMessage('Se ha escaneado con exito el código QR!', 'success');
    } else {
      this.toastMessage('Escaneo fallido. Intente nuevamente.', 'danger');
    }
  }
}
