import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule, } from '@angular/common/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ShareModule } from './components/share.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AlertComponent } from './components/alert/alert.component';
import { ToastrModule } from 'ngx-toastr';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HeaderComponent } from './components/header/header.component';
import { OrderCartComponent } from './pages/order-cart/order-cart.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { PayOrderComponent } from './pages/order-cart/pay-order/pay-order.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ResetPasswordComponent,
    NotFoundComponent,
    HomeComponent,
    OrderCartComponent,
    PayOrderComponent,
    AboutComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    FormsModule,
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    ModalModule.forRoot(),
    ShareModule,
    RouterModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgSelectModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
