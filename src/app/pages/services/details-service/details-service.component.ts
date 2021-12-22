import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Services } from 'src/app/common/type';
import { PagesService } from '../../pages.service';
@Component({
  selector: 'app-details-service',
  templateUrl: './details-service.component.html',
  styleUrls: ['./details-service.component.scss']
})
export class DetailsServiceComponent implements OnInit {
  tabView = 'about';
  bookingForm: FormGroup;
  listServices: Services[] = [];
  dateConfig = {
    containerClass: 'theme-red',
    isAnimated: true,
    minDate: new Date(),
    showWeekNumbers: false,
  }
  service: Services;
  constructor(
    private route: ActivatedRoute,
    public pageService: PagesService,
    private fb: FormBuilder,
  ) {
    this.bookingForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      date_visit: [new Date()],
      time_visit: [null],
      service: [null],
      msg: ['']
    });
   }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.pageService.getServiceDetail({id: id}))
    ).subscribe(services => {
      this.service = services[0];
      this.bookingForm.get('service').setValue(this.service.id);
      this.getServices();
      console.log(this.service)
    })
  }

  changeView(type){
    this.tabView = type;
  }

  /**
   * Get data services
   */
  getServices(){
    this.pageService.getService().subscribe(
      res => {
        this.listServices = res;
      }
    )
  }

  submitBooking(form){
    console.log(form)
  }

}
