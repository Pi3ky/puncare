import { Component } from '@angular/core';
import { AlertService } from './_services/alert.service';
import { PublicService } from './_services/public.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    public publicService: PublicService,
    private alertService: AlertService,
  ){
    if (!this.publicService.services.length) {
      this.getServices();
    }
  }

  getServices(){
    if (!this.publicService.services || (this.publicService.services && !this.publicService.services.length)) {
      this.publicService.getServices({}).subscribe(
        res => {
          this.publicService.services = res.data;
        },
        err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }
}
