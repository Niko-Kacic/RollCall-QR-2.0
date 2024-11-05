import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';


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
    canActivate: [AuthGuard]

  },
  {
    path: 'main-page',
    loadChildren: () => import('./pages/main-page/main-page.module').then(m => m.MainPagePageModule),

  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'subjects',

    loadChildren: () => import('./pages/subjects/subjects.module').then( m => m.SubjectsPageModule),
    canActivate: [authGuard],
    children:[
      {
        path: '',
        loadChildren: () => import('./pages/subjects/subjects.module').then( m => m.SubjectsPageModule),
        canActivate: [AuthGuard]
      },
      {
        path: ':placeId',
        loadChildren: () => import('./pages/subjects/subject-detail/subject-detail-routing.module').then( m => m.SubjectDetailPageRoutingModule),
        canActivate: [AuthGuard]
      }
    ],
    canActivate: [AuthGuard]
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
    path: 'error-404',
    loadChildren: () => import('./pages/error-404/error-404.module').then( m => m.Error404PageModule)
  }, {
    path: '**',
    redirectTo: 'main-page',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

