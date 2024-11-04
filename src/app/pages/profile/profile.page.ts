import { Component, OnInit } from '@angular/core';
import { FireDataBaseService } from 'src/app/services/fire-data-base.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  public footerTitle: string = '{ Code By CodeCrafters }';
  lastname: string = "";

  constructor(private fireDataBaseService: FireDataBaseService) {}

  ngOnInit() {
    this.fireDataBaseService.getUserData('Kg8tfvtJuwsEuZxdGacA').subscribe(data => {
      this.lastname = data['lastname'];
      console.log(this.lastname);
    });
  }
}

