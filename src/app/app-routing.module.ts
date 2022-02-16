import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    redirectTo: 'pages',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
