import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { DaterangepickerConfig } from 'ng2-daterangepicker';

@Component({
  selector: 'picker-date',
  templateUrl: './picker-date.component.html',
  styleUrls: ['./picker-date.component.scss']
})
export class PickerDateComponent implements OnInit {
  selectedDate = moment().locale('vi-VN').format('L');
  @Input() customCss: string = '';
  @Output() selected = new EventEmitter<any>();
  constructor(private daterangepickerOptions: DaterangepickerConfig,) {
    this.daterangepickerOptions.settings = {
      locale: {
        format: 'DD/MM/YYYY',
        daysOfWeek: [
          "CN",
          "T2",
          "T3",
          "T4",
          "T5",
          "T6",
          "T7"
        ],
        monthNames: [
          "Tháng 1",
          "Tháng 2",
          "Tháng 3",
          "Tháng 4",
          "Tháng 5",
          "Tháng 6",
          "Tháng 7",
          "Tháng 8",
          "Tháng 9",
          "Tháng 10",
          "Tháng 11",
          "Tháng 12"
        ],
      },
      autoApply: true,
      buttonClasses: 'd-none',
      timePicker24Hour: true,
      singleDatePicker: true,
    };
  }

  ngOnInit() {
  }

  SelectDate(evt) {
    this.selectedDate = moment(evt.start).locale('vi-VN').format('L');
    this.selected.emit(Date.parse(evt.start))
  }
}
