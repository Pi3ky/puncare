import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AlertComponent } from './alert/alert.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [ AlertComponent, ConfirmModalComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [AlertComponent, ConfirmModalComponent],
  exports: [CarouselModule ],
})
export class ShareModule { }
