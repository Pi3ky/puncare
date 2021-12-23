import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmServicesComponent } from './adm-services/adm-services.component';
import { EditServicesModalComponent } from './adm-services/edit-services-modal/edit-services-modal.component';

const routes: Routes = [
  { path: 'services', component: AdmServicesComponent },
  { path: 'services/:id', component: EditServicesModalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
