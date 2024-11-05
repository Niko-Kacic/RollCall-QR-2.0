import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectsPage } from './subjects.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectsPage
  },  {
    path: 'subject-detail',
    loadChildren: () => import('./subject-detail/subject-detail.module').then( m => m.SubjectDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectsPageRoutingModule {}
