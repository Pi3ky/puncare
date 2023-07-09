import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth-services.service';
import { PublicService } from 'src/app/_services/public.service';
import { District, Province, Ward } from 'src/app/common/type';

@Component({
  selector: 'app-pay-order',
  templateUrl: './pay-order.component.html',
  styleUrls: ['./pay-order.component.scss']
})
export class PayOrderComponent implements OnInit {
  readonly shippingFee: number = 20000;
  submitted = false;
  payForm = {
    name: '',
    address: '',
    bankingCode: '',
    wardId: '',
    wardName: '',
    provinceId: '',
    provinceName: '',
    phone: '',
    email: '',
    districtId: '',
    districtName: '',
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
  dataDistricts: District[] = [];
  dataWards: Ward[] = [];
  dataQr = null;
  readonly bankingAccount = {
    id: 970418, //BIDV
    name: "BUI DINH KHANG",
    number: 45010006367712
  };
  ordersList = [];
  constructor(
    private publicService: PublicService,
    private authService: AuthService,
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
        this.payForm.provinceId = user.city;
        this.payForm.districtId = user.district;
        this.payForm.address = user.address;
        this.payForm.email = user.email;
        this.calcTotalPrice();
      } else {
        this.payForm = this.getPayFormDefault();
        this.calcTotalPrice();
      }
    })
    this.payForm.bankingCode = this.genBankingCode();
  }

  genBankingCode() {
    return "pcpo_" + new Date().valueOf()
  }

  createQrBanking(){
    const body = {
      accountNo: this.bankingAccount.number,
      accountName: this.bankingAccount.name,
      acqId: this.bankingAccount.id,
      amount: this.shippingFee + this.payForm.totalPrice,
      addInfo: this.payForm.bankingCode,
      format: "text",
      template: "compact2"
    }
    this.publicService.createQRBanking(body).subscribe(
      result => {
        this.dataQr = result.data;
      },
      err => {
        console.error(err);
      }
    )
  }

  getPayFormDefault() {
    return {
      name: '',
      address: '',
      provinceId: '',
      provinceName: '',
      wardId: '',
      wardName: '',
      phone: '',
      email: '',
      districtId: '',
      districtName: '',
      totalPrice: 0,
      bankingCode: '',
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
    this.createQrBanking();
  }

  specificProvince(evt) {
    this.payForm.provinceName = evt.province_name;
    this.getDistrict(evt.province_id)
  }

  getDistrict(id: string) {
    this.publicService.getDistrict(id).subscribe(
      districtData => {
        this.dataDistricts = districtData.results;
      },
      error => {
        console.error(error);
      }
    )
  }

  specificDistrict(evt) {
    this.payForm.districtName = evt.district_name;
    this.getWard(evt.district_id);
  }

  getWard(id: string) {
    this.publicService.getWard(id).subscribe(
      wardData => {
        this.dataWards = wardData.results
      },
      err => {
        console.error(err);
      }
    )
  }

  specificWard(evt) {
    this.payForm.wardName = evt.ward_name;
  }

  submit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.submitted = true;
      this.spinner.show();
      this.payForm.items = this.ordersList;
      this.payForm.totalPrice += this.shippingFee;
      this.publicService.createOrder(this.payForm).subscribe(
        res => {
          this.alertService.success('Đơn hàng đã được gửi đi!');
          this.publicService.setOrderProductValue(null);
          this.router.navigate(['/products'])
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
