import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {

  private barcodeScannerSupported: boolean = false;

  constructor() {}

  async init(): Promise<void> {
    try {
      const result = await BarcodeScanner.isSupported();
      this.barcodeScannerSupported = result.supported;
    } catch (e) {
      console.error('Failed to check barcode scanner support', e);
    }
  }

  async scan(): Promise<string[]> {
    if (this.barcodeScannerSupported) {
      const permission = await BarcodeScanner.checkPermissions();
      if (permission.camera === 'granted' || permission.camera === 'limited') {
        const { barcodes } = await BarcodeScanner.scan();
        return barcodes.map(barcode => barcode.rawValue);
      } else {
        await BarcodeScanner.requestPermissions();
        const { barcodes } = await BarcodeScanner.scan();
        return barcodes.map(barcode => barcode.rawValue);
      }
    } else {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });
      return [result.ScanResult];
    }
  }
}
