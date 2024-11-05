import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor() { }

  public subjects  = [
    {
       id: '1',
       title: 'Arquitectura de Software',
       imageURL: 'https://cdn-icons-png.flaticon.com/512/5271/5271007.png',
       profileImg: 'https://avatars.githubusercontent.com/u/34869177?v=4',
       details: [' Cursando ', 'ERNESTO LEONIDAS VELASQUEZ VELASQUEZ ',' 80%' ,' (4 de 5 clases)'],

    },
    {
       id: '2',
       title: 'Calidad de Software',
       imageURL: 'https://cdn-icons-png.flaticon.com/512/4677/4677559.png',
       profileImg: 'https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg',
       details: [' Cursando ', 'DANIEL ENRIQUE RIQUELME RIGOT ', ' 100%',' (9 de 9 clases)'],
    },
    {
       id: '3',
       title: 'Estadistica Descriptiva ',
       imageURL: 'https://cdn-icons-png.flaticon.com/512/432/432796.png',
       profileImg: 'https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg',
       details: [' Cursando ', 'MONICA NATHALIA PANES MARTINEZ ', ' 100%',' (10 de 10 clases)'],
    },
    {
       id: '4',
       title: 'Etica Laboral',
       imageURL: 'https://cdn-icons-png.flaticon.com/512/5776/5776927.png',
       profileImg: 'https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg',
       details: [' Cursando ', 'LEONARDO OSVALDO MUÑOZ VILLALÓN ', ' 100%',' (6 de 6 clases)'],
    },
    {
       id: '5',
       title: 'Ingles Intermedio',
       imageURL: 'https://images.vexels.com/content/201997/preview/english-book-flat-17d09a.png',
       profileImg: 'https://learn.content.blackboardcdn.com/3900.100.0-rel.32+b7093a7/images/ci/ng/default_profile_avatar.svg',
       details: [' Cursando ', 'JOSE SANTOS JARA FUENTES ', ' 75%',' (15 de 20 clases)'],
    },
    {
       id: '6',
       title: 'Programación Aplicaciones Moviles',
       imageURL: 'https://www.svgrepo.com/show/530452/mobile-app.svg',
       profileImg: 'https://avatars.githubusercontent.com/u/8823837?v=4',
       details: [' Cursando ', 'CARLOS FERNANDO MARTINEZ SANCHEZ', ' 100%',' (9 de 9 clases)']
    },

];

getCourses(){
  return [...this.subjects ];
}

getCourse(subjectId: any){
return {
  ...this.subjects .find( subject =>{
    return subject.id === subjectId
  })
}
}

}
