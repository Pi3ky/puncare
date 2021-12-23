import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-edit-services-modal',
  templateUrl: './edit-services-modal.component.html',
  styleUrls: ['./edit-services-modal.component.scss']
})
export class EditServicesModalComponent implements OnInit {
  service = {
    _id: '',
    title: '',
    description: '',
    image: '',
    price: '',
    about: '',
    details: [],
    time: ''
  };
  constructor(
    private route: ActivatedRoute,
    public publicService: PublicService,
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => this.publicService.getServiceDetail(id))
    ).subscribe(service => {
      this.service = service;
      console.log(this.service)
    })
  }

  updateService(form) {

  }
}
