import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from 'ngx-bootstrap/modal';
import { EditorModule } from '@tinymce/tinymce-angular';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmServicesComponent } from './adm-services/adm-services.component';
import { EditServicesModalComponent } from './adm-services/edit-services-modal/edit-services-modal.component';
import { ShareModule } from '../components/share.module';
import { AdmProductsComponent } from './adm-products/adm-products.component';
import { EditProductComponent } from './adm-products/edit-product/edit-product.component';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [AdmServicesComponent, EditServicesModalComponent, AdmProductsComponent, EditProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ModalModule.forRoot(),
    NgSelectModule,
    EditorModule,
    ShareModule
  ],
  entryComponents: []
})
export class AdminModule { }
