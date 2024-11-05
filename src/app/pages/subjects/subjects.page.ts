import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.page.html',
  styleUrls: ['./subjects.page.scss'],
})
export class SubjectsPage implements OnInit {

  public footerTitle: string = '{ Code By CodeCrafters }';

  constructor(private router: Router) { }




  ngOnInit() {

  }

}
