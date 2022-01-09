import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PaginationComponent } from './pagination/pagination.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { FormContactModalComponent } from './form-contact-modal/form-contact-modal.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

const E_MODULES =  [NgxPaginationModule, CarouselModule, FormsModule, ReactiveFormsModule ];
const E_COMPONENTS =  [PaginationComponent ];
@NgModule({
  declarations: [ ConfirmModalComponent, PaginationComponent, LoginCustomerComponent, FormContactModalComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  entryComponents: [ConfirmModalComponent, LoginCustomerComponent, FormContactModalComponent],
  exports: [...E_MODULES, ...E_COMPONENTS ],
})
export class ShareModule { }
