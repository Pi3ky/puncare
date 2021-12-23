import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Services } from 'src/app/common/type';
import { PublicService } from 'src/app/services/public.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EditServicesModalComponent } from './edit-services-modal/edit-services-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adm-services',
  templateUrl: './adm-services.component.html',
  styleUrls: ['./adm-services.component.scss']
})
export class AdmServicesComponent implements OnInit {
  listServices: Services[] = [];
  constructor(
    private publicService: PublicService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.publicService.services.length) {
      this.listServices = this.publicService.services;
    } else {
      this.getServices();
    }
  }

  /**
   * Get data services
   */
  getServices(){
    this.spinner.show();
    this.publicService.getServices().pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listServices = res;
      },
      err => {
        console.error(err);
      }
    )
  }

  editService(service: Services) {
    this.router.navigate(['/admin/services', service._id])
  }

  removeService(service) {

  }

}
