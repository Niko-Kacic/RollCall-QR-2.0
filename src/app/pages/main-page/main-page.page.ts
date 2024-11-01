import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.page.html',
  styleUrls: ['./main-page.page.scss'],
})
export class MainPagePage implements OnInit {

  constructor() { }

  public footerTitle: string = '{ Code By CodeCrafters }';


  ngOnInit() {
  }

}
