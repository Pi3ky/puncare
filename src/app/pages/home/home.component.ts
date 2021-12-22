import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PagesService } from '../pages.service';
import { finalize } from "rxjs/operators";
import { NgxSpinnerService } from 'ngx-spinner';
import { Services } from 'src/app/common/type';
import { Router } from '@angular/router';
import { open_hours, shop_address } from 'src/app/common/const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  listServices: Services[] = [];
  open_hours = open_hours;
  shop_address = shop_address;
  constructor(
    private pageService: PagesService,
    private spinner: NgxSpinnerService,
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
      400: {
        items: 1
      },
      940: {
        items: 2
      }
    },
    nav: true
  }

  ngOnInit() {
    this.getService();
  }

  /**
   * Get data services
   */
  getService(){
    this.spinner.show();
    this.pageService.getService().pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listServices = res;
      }
    )
  }

  /**
   * View selected service
   * @param service
   */
  openService(service: Services){
    this.router.navigate(['/pages/services', service.id])
  }

}
