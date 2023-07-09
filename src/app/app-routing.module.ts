import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HomeComponent } from './pages/home/home.component';
import { OrderCartComponent } from './pages/order-cart/order-cart.component';
import { AboutComponent } from './pages/about/about.component';
import { PayOrderComponent } from './pages/order-cart/pay-order/pay-order.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cart',
    component: OrderCartComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'payment',
    component: PayOrderComponent
  },
  {
    path: 'services',
    loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
  },
  {
    path: 'products',
    loadChildren: () => import('src/app/pages/products/products.module').then(m => m.ProductsModule)
  },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
