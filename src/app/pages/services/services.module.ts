import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { DetailsServiceComponent } from './details-service/details-service.component';
import { ServicesComponent } from './services.component';

@NgModule({
  declarations: [DetailsServiceComponent, ServicesComponent],
  imports: [
    CommonModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
