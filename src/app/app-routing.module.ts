import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './guards/no-auth.guard';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
    canActivate: [noAuthGuard]
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./pages/reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: 'main-menu',
    loadChildren: () => import('./pages/main-menu/main-menu.module').then(m => m.MainMenuPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'main-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPagePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'subjects',

    loadChildren: () => import('./pages/subjects/subjects.module').then( m => m.SubjectsPageModule),
    canActivate: [authGuard]
    children:[
      {
        path: '',
        loadChildren: () => import('./pages/subjects/subjects.module').then( m => m.SubjectsPageModule)
      },
      {
        path: ':placeId',
        loadChildren: () => import('./pages/subjects/subject-detail/subject-detail-routing.module').then( m => m.SubjectDetailPageRoutingModule)
      }
    ]
  },
  {
    path: 'schedule',
    loadChildren: () => import('./pages/schedule/schedule.module').then( m => m.SchedulePageModule),
    canActivate: [authGuard]
  },
  {
    path: 'study-groups',
    loadChildren: () => import('./pages/study-groups/study-groups.module').then( m => m.StudyGroupsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'news',
    loadChildren: () => import('./pages/news/news.module').then( m => m.NewsPageModule),
    canActivate: [authGuard]
  },
  {
    path: 'events',
    loadChildren: () => import('./pages/events/events.module').then( m => m.EventsPageModule),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'main-page',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

