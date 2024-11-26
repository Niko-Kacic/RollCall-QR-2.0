import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectsApiService } from 'src/app/services/subjects-api.service';
import { SubjectsService } from 'src/app/services/subjects.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';
  courses : any[]=[];
  subjects : any[]=[];

  constructor(
    private router: Router,
    private subjectservice: SubjectsService,
    private subjetApi: SubjectsApiService,
  ) { }


  ngOnInit() {
    // Consumo de service
    this.courses = this.subjectservice.getCourses();

    // Consumo de API
    this.subjetApi.getSubjects().subscribe((data) => {
      this.subjects = data;
    });
    
  }

}
