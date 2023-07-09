import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { finalize } from 'rxjs/operators';
import { Services } from 'src/app/common/type';
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
  }
  selectedDate: string = new Date().toLocaleDateString();
  loadService = false;
  bookingForm = {
    name: '',
    phone: '',
    email: '',
    service_id: null,
    service_name: '',
    date_visit: Date.now(),
    time_visit: null,
    msg: ''
  };
;
  service: Services;
  currentUser: any;
  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public publicService: PublicService,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getCurrentService(id);
    this.getServices();
    this.authService.currentUser.subscribe(
      user => {
        this.currentUser = user;
        this.bookingForm = this.getDefaultForm();
      }
    )
  }

  getCurrentService(id) {
    this.spinner.show();
    this.publicService.getServiceDetail(id).pipe(finalize(() => this.spinner.hide())).subscribe(
      res => {
        this.service = res;
        this.bookingForm = this.getDefaultForm();
      },
      err => {
        this.alertService.error(err);
        console.error(err)
      }
    )
  }

  getDefaultForm(){
    return {
      name: this.currentUser ? this.currentUser.name : '',
      phone: this.currentUser ? this.currentUser.phone : '',
      email: this.currentUser ? this.currentUser.email : '',
      service_id: this.service ? this.service._id : null,
      service_name: this.service ? this.service.title : '',
      date_visit: Date.now(),
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
    this.loadService = true;
    this.publicService.getServices({}).pipe(finalize(() => this.loadService = false)).subscribe(
      res => {
        this.listServices = res.data;
      },
      err => {
        console.error(err);
        this.alertService.error(err.error);
      }
    )
  }

  submitBooking(form){
    form.control.markAllAsTouched();
    if(form.valid){
      const body = {
        ...this.bookingForm,
      }
      this.spinner.show();
      this.publicService.sendContact(body).pipe(finalize(() => this.spinner.hide())).subscribe(
        res => {
          form.reset();
          this.alertService.success('Chúng tôi sẽ sớm liên hệ với bạn!');
          this.bookingForm = this.getDefaultForm();
        },
        err => {
          console.error(err);
          this.alertService.error(err.error);
        }
      )
    }
  }

  setService(service) {
    this.bookingForm.service_name = service.title;
  }

  pickDate(date) {
    this.bookingForm.date_visit = date;
  }
}
