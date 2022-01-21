import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollapseModule } from 'ngx-bootstrap/collapse';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../components/share.module';
import { FormsModule } from '@angular/forms';
import { OrderCartComponent } from './order-cart/order-cart.component';
import { PayOrderComponent } from './order-cart/pay-order/pay-order.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AboutComponent } from './about/about.component';
@NgModule({
  declarations: [HomeComponent, OrderCartComponent, PayOrderComponent, AboutComponent],
  imports: [
    ShareModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    CollapseModule.forRoot(),
    NgSelectModule,
  ],
  entryComponents: []
})
export class PagesModule { }
