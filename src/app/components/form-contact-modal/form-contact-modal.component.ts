import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/common/type';
import { PublicService } from 'src/app/services/public.service';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/services/alert.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-form-contact-modal',
  templateUrl: './form-contact-modal.component.html',
  styleUrls: ['./form-contact-modal.component.scss']
})
export class FormContactModalComponent implements OnInit {
  listServices: Services[] = [];
  dateConfig = {
    containerClass: 'theme-red',
    isAnimated: true,
    minDate: new Date(),
    showWeekNumbers: false,
    dateInputFormat: 'DD/MM/YYYY',
  }
  isLoading = false;
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
  constructor(
    public publicService: PublicService,
    public bsModalRef: BsModalRef,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }

  onSubmit(form){
    form.control.markAllAsTouched();
    if(form.valid){
      this.isLoading = true;
      const body = {
        ...this.contactForm,
        date_visit: moment(this.contactForm.date_visit).format("DD/MM/YYYY")
      }
      this.publicService.sendContact(body).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          form.reset();
          this.bsModalRef.hide();
          this.alertService.success('Gửi tin nhắn thành công!');
        },
        err => {
          console.error(err);
          this.alertService.error(err)
        }
      )
    }
  }

  setService(service) {
    this.contactForm.service_name = service.title;
  }
}
