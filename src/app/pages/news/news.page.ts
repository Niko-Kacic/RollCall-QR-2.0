import { Component, OnInit } from '@angular/core';
import { NewsApiService } from '../../services/news-api.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {

  news: any[] = [];  
  loading: boolean = true;  

  constructor(
    private newsApiService: NewsApiService
  ) { }

  ngOnInit() {
    this.loadNews();
  }

  // Método para cargar las noticias
  loadNews() {
    this.newsApiService.getNews().subscribe(
      (data) => {
        this.news = data;  
        this.loading = false;  
      },
      (error) => {
        console.error('Error al obtener las noticias', error);
        this.loading = false;
      }
    );
  }


}
