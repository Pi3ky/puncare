import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { finalize } from "rxjs/operators";
import { NgxSpinnerService } from 'ngx-spinner';
import { Services } from 'src/app/common/type';
import { Router } from '@angular/router';
import { open_hours, shop_address } from 'src/app/common/const';
import { PublicService } from 'src/app/_services/public.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormContactModalComponent } from 'src/app/components/form-contact-modal/form-contact-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listServices: Services[] = [];
  open_hours = open_hours;
  shop_address = shop_address;
  totalItems = 0;
  constructor(
    private spinner: NgxSpinnerService,
    public publicService: PublicService,
    private modalService: BsModalService,
    private router: Router,
  ) { }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 40,
    autoplay: true,
    center: true,
    navSpeed: 700,
    autoplaySpeed: 700,
    autoplayHoverPause: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      940: {
        items: 2
      }
    },
    nav: true
  }

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
    this.publicService.getServices({}).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listServices = res.data;
        this.totalItems = res.total;
      }
    )
  }

  /**
   * View selected service
   * @param service
   */
  openService(service: Services){
    this.router.navigate(['/services', service._id])
  }

  openContactModal(){
    this.modalService.show(FormContactModalComponent, {
      class: "modal-lg modal-dialog-centered",
      initialState: {
        listServices: this.listServices
      }
    })
  }

}
