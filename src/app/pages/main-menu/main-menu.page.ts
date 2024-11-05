import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})

export class MainMenuPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';


  constructor(
    private menu: MenuController,
    private router: Router,
  ) { }


  redirect_profile(){
    this.router.navigate(['/profile']);
  };

  redirect_subjects(){
    this.router.navigate(['/subjects']);
  };


  ngOnInit() {

  }

}
