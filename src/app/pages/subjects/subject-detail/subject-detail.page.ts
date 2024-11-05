import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubjectsApiService } from 'src/app/services/subjects-api.service';

@Component({
  selector: 'app-subject-detail',
  templateUrl: './subject-detail.page.html',
  styleUrls: ['./subject-detail.page.scss'],
})
export class SubjectDetailPage implements OnInit {

  subjectDetail: any ;
  subjects: any[] = [];
  public footerTitle: string = '{ Code By CodeCrafters }';

  constructor(
    private activatedrouter: ActivatedRoute,
    private subjetApi: SubjectsApiService
  ) { }

  ngOnInit() {
      // Captura el id de la URL
      this.activatedrouter.paramMap.subscribe(paramMap => {
        const subjectId = paramMap.get('placeId'); // Obtén el id de la asignatura

        // Llama al servicio para obtener todas las asignaturas
        this.subjetApi.getSubjects().subscribe((data) => {
          this.subjects = data;

          // Encuentra la asignatura que coincide con el id
          this.subjectDetail = this.subjects.find(signature => signature.id === subjectId);

          console.log(this.subjectDetail); // Verifica que hayas obtenido la asignatura correcta
        });
      });
  }

}
