import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { shop_address } from 'src/app/common/const';
import { Services } from 'src/app/common/type';
import { AlertService } from 'src/app/_services/alert.service';
import { PublicService } from 'src/app/_services/public.service';
import { PagesService } from '../pages.service';
import * as moment from 'moment';
import { AuthService } from 'src/app/_services/auth-services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  listServices: Services[] = [];
  dateConfig = {
    containerClass: 'theme-red',
    isAnimated: true,
    minDate: new Date(),
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY',
  }
  contactForm = {
    name: '',
    phone: '',
    email: '',
    service_id: null,
    service_name: '',
    date_visit: new Date,
    time_visit: null,
    msg: ''
  };
  search = {
    title: '',
    sort: '',
    dir: '',
    page: 1,
    page_size: 6
  }
  totalItems = 0;
  shop_address = shop_address;
  constructor(
    public pageService: PagesService,
    private spinner: NgxSpinnerService,
    public publicService: PublicService,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
   }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.contactForm.name = user.name;
        this.contactForm.email = user.email;
        this.contactForm.phone = user.phone;
      } else {
        this.contactForm = this.getDefaultForm();
      }
    })
    this.getServices();
  }

  /**
   * Get data services
   */
  getServices(){
    this.spinner.show();
    this.publicService.getServices(this.search).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.listServices = res.data;
        this.totalItems = res.total;
      },
      err => {
        console.error(err);
      }
    )
  }

  /**
   * View selected service
   * @param service
   */
  openService(service: Services){
    this.router.navigate(['/pages/services', service._id])
  }

  onSubmit(form){
    if(form.valid){
      this.spinner.show();
      const body = {
        ...this.contactForm,
        date_visit: moment(this.contactForm.date_visit).format("DD/MM/YYYY")
      }
      this.publicService.sendContact(body).pipe(finalize(() => this.spinner.hide())).subscribe(
        res => {
          this.contactForm = this.getDefaultForm();
          form.reset();
          this.alertService.success('Gửi tin nhắn thành công!');
        },
        err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }

  getDefaultForm(){
    return {
      name: '',
      phone: '',
      email: '',
      service_id: null,
      service_name: '',
      date_visit: new Date,
      time_visit: null,
      msg: ''
    }
  }

  setService(service) {
    this.contactForm.service_name = service.title;
  }

  changePage(evt) {
    this.search.page = evt.page;
    this.getServices();
  }
}
