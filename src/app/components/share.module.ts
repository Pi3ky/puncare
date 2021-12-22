import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [ AlertComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [AlertComponent],
  exports: [CarouselModule ]
})
export class ShareModule { }
