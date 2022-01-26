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
import { MustMatchDirective } from '../directives';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { TabsModule } from 'ngx-bootstrap/tabs';

const E_MODULES =  [NgxPaginationModule, CarouselModule, FormsModule, ReactiveFormsModule ];
const E_COMPONENTS =  [PaginationComponent ];
@NgModule({
  declarations: [ ConfirmModalComponent, PaginationComponent, LoginCustomerComponent, FormContactModalComponent, MustMatchDirective, ModalUserComponent],
  imports: [
    CommonModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TabsModule.forRoot(),
    NgSelectModule,
  ],
  entryComponents: [ConfirmModalComponent, LoginCustomerComponent, FormContactModalComponent, ModalUserComponent],
  exports: [...E_MODULES, ...E_COMPONENTS, MustMatchDirective ],
})
export class ShareModule { }
