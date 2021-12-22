import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { shop_address } from 'src/app/common/const';
import { Services } from 'src/app/common/type';
import { PagesService } from 'src/app/pages/pages.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  now = new Date();
  shop_address = shop_address;
  services: Services[] = [];
  constructor(private pageService: PagesService,) { }

  ngOnInit() {
    interval(1000).subscribe(
      () => {
        this.now = new Date();
      }
    )
    this.getServices();
  }

  getServices(){
    this.pageService.getService().subscribe(
      res => {
        this.services = res;
      },
      err => {
        console.error(err)
      }
    )
  }


}
