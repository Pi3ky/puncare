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
import { PagesComponent } from './pages.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HeaderComponent } from '../components/header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  declarations: [HomeComponent, OrderCartComponent, PayOrderComponent, AboutComponent, PagesComponent, HeaderComponent, FooterComponent],
  imports: [
    ShareModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    NgSelectModule,
  ],
  entryComponents: []
})
export class PagesModule { }
