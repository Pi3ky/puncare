import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmServicesComponent } from './adm-services/adm-services.component';
import { EditServicesModalComponent } from './adm-services/edit-services-modal/edit-services-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdmServicesComponent, EditServicesModalComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule.forRoot(),
    FormsModule
  ],
  entryComponents: []
})
export class AdminModule { }
