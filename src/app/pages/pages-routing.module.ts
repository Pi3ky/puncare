import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'services',
    loadChildren: () => import('./services/services.module').then(m => m.ServicesModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
