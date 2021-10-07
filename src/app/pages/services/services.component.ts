import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import { Services } from 'src/app/common/type';
import { PagesService } from '../pages.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  listServices: Services[] = [];
  loginForm: FormGroup;
  constructor(
    private pageService: PagesService,
    private spinner: NgxSpinnerService,
    private router: Router,
  ) { }

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

  /**
   * Select services
   */
  selectService(evt: Services){
    console.log(evt)
  }

  onSubmit(){

  }

}
