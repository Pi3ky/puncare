import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { ShareModule } from '../components/share.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    ShareModule,
    CommonModule,
    FormsModule,
    PagesRoutingModule
  ]
})
export class PagesModule { }
