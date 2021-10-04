import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollDown = false;
  constructor() { }

  ngOnInit() {
    fromEvent(document, 'scroll').subscribe(
      res => {
        const croodY = window.scrollY;
        if(croodY === 0){
          this.scrollDown = false;
        } else {
          this.scrollDown = true;
        }
      }
    )
  }

}
