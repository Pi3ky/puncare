import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  now = new Date();
  constructor() { }

  ngOnInit() {
    interval(1000).subscribe(
      () => {
        this.now = new Date();
      }
    )
  }

}
