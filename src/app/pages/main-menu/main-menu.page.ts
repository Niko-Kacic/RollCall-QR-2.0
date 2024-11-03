import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})

export class MainMenuPage implements OnInit {

  constructor(private menu: MenuController) { }

  public footerTitle: string = '{ Code By CodeCrafters }';

  ngOnInit() {

  }

}
