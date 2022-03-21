import { Component, OnInit } from '@angular/core';
import { Services } from 'src/app/common/type';
import { PublicService } from 'src/app/_services/public.service';
import * as moment from 'moment';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertService } from 'src/app/_services/alert.service';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth-services.service';

@Component({
  selector: 'app-form-contact-modal',
  templateUrl: './form-contact-modal.component.html',
  styleUrls: ['./form-contact-modal.component.scss']
})
export class FormContactModalComponent implements OnInit {
  listServices: Services[] = [];
  isLoading = false;
  contactForm = {
    name: '',
    phone: '',
    email: '',
    service_id: null,
    service_name: '',
    date_visit: Date.now(),
    time_visit: null,
    msg: ''
  };
  constructor(
    public publicService: PublicService,
    public bsModalRef: BsModalRef,
    private authService: AuthService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.contactForm.name = user.name;
        this.contactForm.email = user.email;
        this.contactForm.phone = user.phone;
      }
    })
  }

  pickDate(date) {
    this.contactForm.date_visit = date;
  }

  onSubmit(form){
    form.control.markAllAsTouched();
    if(form.valid){
      const body = {
        ...this.contactForm
      };
      this.isLoading = true;
      this.publicService.sendContact(body).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          form.reset();
          this.bsModalRef.hide();
          this.alertService.success('Gửi tin nhắn thành công!');
        },
        err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }

  setService(service) {
    this.contactForm.service_name = service.title;
  }
}
