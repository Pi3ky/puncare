import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../components/share.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    ShareModule,
    CommonModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
