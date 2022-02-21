import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { finalize, map, switchMap } from 'rxjs/operators';
import { Services } from 'src/app/common/type';
import { PagesService } from '../../pages.service';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { PublicService } from 'src/app/_services/public.service';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth-services.service';
@Component({
  selector: 'app-details-service',
  templateUrl: './details-service.component.html',
  styleUrls: ['./details-service.component.scss']
})
export class DetailsServiceComponent implements OnInit {
  tabView = 'about';
  listServices: Services[] = [];
  dateConfig = {
    containerClass: 'theme-red',
    isAnimated: true,
    minDate: new Date(),
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY',
  }
  bookingForm = {
    name: '',
    phone: '',
    email: '',
    service_id: null,
    service_name: '',
    date_visit: new Date,
    time_visit: null,
    msg: ''
  };
  service: Services;
  constructor(
    private route: ActivatedRoute,
    public pageService: PagesService,
    private spinner: NgxSpinnerService,
    public publicService: PublicService,
    private authService: AuthService,
    private alertService: AlertService,
  ) {

   }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.bookingForm.name = user.name;
        this.bookingForm.email = user.email;
        this.bookingForm.phone = user.phone;
      } else {
        this.bookingForm = this.getDefaultForm();
      }
    })
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.publicService.getServiceDetail(id))
    ).subscribe(service => {
      this.service = service;
      this.bookingForm.service_id = this.service._id;
      this.getServices();
    })
  }

  getDefaultForm(){
    return {
      name: '',
      phone: '',
      email: '',
      service_id: this.service._id,
      service_name: '',
      date_visit: new Date,
      time_visit: null,
      msg: ''
    }
  }

  changeView(type){
    this.tabView = type;
  }

  /**
   * Get data services
   */
  getServices(){
    this.publicService.getServices({}).subscribe(
      res => {
        this.listServices = res.data;
      }
    )
  }

  submitBooking(form){
    form.control.markAllAsTouched();
    if(form.valid){
      this.spinner.show();
      const body = {
        ...this.bookingForm,
        date_visit: moment(this.bookingForm.date_visit).format("DD/MM/YYYY")
      }
      this.publicService.sendContact(body).pipe(finalize(() => this.spinner.hide())).subscribe(
        res => {
          form.reset();
          this.alertService.success('Chúng tôi sẽ sớm liên hệ với bạn!');
          this.bookingForm = this.getDefaultForm();
          form.reset();
        },
        err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }

  setService(service) {
    this.bookingForm.service_name = service.title;
  }

}
