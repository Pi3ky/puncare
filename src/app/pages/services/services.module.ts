import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';

import { ServicesRoutingModule } from './services-routing.module';
import { DetailsServiceComponent } from './details-service/details-service.component';
import { ServicesComponent } from './services.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailsServiceComponent, ServicesComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule,
    ServicesRoutingModule
  ]
})
export class ServicesModule { }
