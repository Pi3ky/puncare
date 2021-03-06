import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth-services.service';
import { PublicService } from 'src/app/_services/public.service';
import { PagesService } from '../../pages.service';

@Component({
  selector: 'app-pay-order',
  templateUrl: './pay-order.component.html',
  styleUrls: ['./pay-order.component.scss']
})
export class PayOrderComponent implements OnInit {
  shippingFee = 20000;
  submitted = false;
  payForm = {
    name: '',
    address: '',
    city: '',
    phone: '',
    email: '',
    district: '',
    totalPrice: 0,
    post_code: '',
    payment: 'banking',
    status: 'created',
    note: '',
    items: []
  };
  arrayPayment = [
    {
      id: 'banking',
      checked: true,
      title: 'Thanh toán online qua ngân hàng'
    },
    {
      id: 'standard',
      checked: false,
      title: 'Thanh toán khi nhận hàng'
    },
  ]
  ordersList = [];
  // currentUser: any;
  constructor(
    private publicService: PublicService,
    private authService: AuthService,
    private pagesService: PagesService,
    private alertService: AlertService,
    private router: Router,
    private spinner: NgxSpinnerService,
  ) {
  }

  ngOnInit() {
    this.ordersList = this.publicService.orderProductValue.orders || [];
    this.authService.currentUser.subscribe(user => {
      if (user) {
        this.payForm.name = user.name;
        this.payForm.phone = user.phone;
        this.payForm.city = user.city;
        this.payForm.district = user.district;
        this.payForm.address = user.address;
        this.payForm.email = user.email;
        this.calcTotalPrice();
      } else {
        this.payForm = this.getPayFormDefault();
        this.calcTotalPrice();
      }
    })
  }

  getPayFormDefault() {
    return {
      name: '',
      address: '',
      city: '',
      phone: '',
      email: '',
      district: '',
      totalPrice: 0,
      post_code: '',
      payment: 'banking',
      status: 'created',
      note: '',
      items: []
    }
  }

  calcTotalPrice() {
    this.payForm.totalPrice = 0;
    this.ordersList.forEach(ord => {
      this.payForm.totalPrice += (ord.price * ord.quantity);
    })
  }

  submit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.submitted = true;
      this.spinner.show();
      this.payForm.items = this.ordersList;
      this.payForm.totalPrice += this.shippingFee;
      this.pagesService.createOrder(this.payForm).subscribe(
        res => {
          this.alertService.success('Đơn hàng đã được gửi đi!');
          this.publicService.setOrderProductValue(null);
          this.router.navigate(['/pages/products'])
        },
        err => {
          console.error(err);
          this.alertService.error(err.error);
          this.spinner.hide();
        }
      )
    }
  }

  selectTypePayment(itemID) {
    this.arrayPayment.forEach(item => {
      if (item.id === itemID) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    })
  }
}
