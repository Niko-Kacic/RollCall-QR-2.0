import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})

export class MainMenuPage implements OnInit {

  news: any[] = [];
  events: any[] = [];

  constructor(private menu: MenuController, private newsService: NewsService) { }

  ngOnInit() {
    this.newsService.getNews().subscribe((data) => {
      this.news = data.noticias;
      this.events = data.eventos;
    });
  }

}
