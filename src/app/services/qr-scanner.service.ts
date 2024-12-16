import { Injectable } from '@angular/core';
import { BarcodeScanner, BarcodeFormat, ScanOptions } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root',
})
export class QrScannerService {
  private isScannerInitialized = false;

  constructor() {}

  /**
   * Inicializa el escáner verificando si es soportado y solicitando permisos.
   * @returns {Promise<boolean>} True si la inicialización fue exitosa.
   */
  async init(): Promise<boolean> {
    try {
      // Solicitar permisos si no están concedidos
      const permissionsGranted = await this.requestPermissions();
      if (!permissionsGranted) {
        console.warn('Permiso de cámara no concedido.');
        return false;
      }

      // Verificar si el escáner es soportado
      const supported = await BarcodeScanner.isSupported();
      if (!supported.supported) {
        console.warn('El dispositivo no soporta escaneo de códigos QR.');
        return false;
      }

      console.log('Escáner inicializado correctamente.');
      this.isScannerInitialized = true;
      return true;
    } catch (e) {
      console.error('Error al inicializar el escáner:', e);
      return false;
    }
  }

  /**
   * Escanea un código QR utilizando la cámara.
   * @returns {Promise<string[]>} Lista de valores escaneados.
   */
  async scan(): Promise<string[]> {
    // Verificar inicialización
    if (!this.isScannerInitialized) {
      const initialized = await this.init();
      if (!initialized) {
        console.warn('No se pudo inicializar el escáner.');
        return [];
      }
    }

    try {
      // Configuración de escaneo
      const scanOptions: ScanOptions = {
        formats: [BarcodeFormat.QrCode], // Solo escanear códigos QR
      };

      const { barcodes } = await BarcodeScanner.scan(scanOptions);
      const results = barcodes.map(barcode => barcode.rawValue);
      console.log('Códigos escaneados:', results);
      return results;
    } catch (e) {
      console.error('Error al escanear el código QR:', e);
      return [];
    }
  }

  /**
   * Solicita permisos para usar la cámara.
   * @returns {Promise<boolean>} True si se otorgan los permisos.
   */
  private async requestPermissions(): Promise<boolean> {
    try {
      const { camera } = await BarcodeScanner.checkPermissions();
      if (camera === 'granted') {
        return true; // Permiso ya otorgado
      }

      const request = await BarcodeScanner.requestPermissions();
      return request.camera === 'granted'; // Retorna true si se otorgó el permiso
    } catch (e) {
      console.error('Error al solicitar permisos de cámara:', e);
      return false;
    }
  }
}
