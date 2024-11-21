import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-logout',
  templateUrl: './confirm-logout.component.html',
  styleUrls: ['./confirm-logout.component.scss'],
})
export class ConfirmLogoutComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private modalController: ModalController,
  ) {}

  async confirmLogout(){
    await this.authService.logout();
    this.router.navigate(['/login']);
    this.dismissModal();
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  ngOnInit() {}
}
