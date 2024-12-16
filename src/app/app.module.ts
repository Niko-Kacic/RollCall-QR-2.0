import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';

import { environment } from '../environments/environment';

import { ConfirmLogoutComponent } from './components/confirm-logout/confirm-logout.component';

import { SharedModule } from './shared/shared.module';

// QR Service
import { QrScannerService } from './services/qr-scanner.service';

export function initQrScannerService(qrScannerService: QrScannerService) {
  return () => qrScannerService.init();
}

export function qrScannerService() {
  return {
      provide: APP_INITIALIZER,
      useFactory: initQrScannerService,
      deps: [QrScannerService],
      multi: true,
  };
}

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    IonicModule,
    AngularFirestoreModule,
    SharedModule
  ],
  providers: [
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    qrScannerService()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
