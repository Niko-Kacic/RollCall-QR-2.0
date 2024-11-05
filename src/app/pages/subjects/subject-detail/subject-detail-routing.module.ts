import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubjectDetailPage } from './subject-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SubjectDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubjectDetailPageRoutingModule {}
