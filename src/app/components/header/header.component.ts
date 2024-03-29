import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { fromEvent } from 'rxjs';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth-services.service';
import { PublicService } from 'src/app/_services/public.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { LoginCustomerComponent } from '../login-customer/login-customer.component';
import { ModalUserComponent } from '../modal-user/modal-user.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  scrollDown = false;
  openMenu = false;
  currentUser;
  orderProducts;
  constructor(
    public publicService: PublicService,
    private modalService: BsModalService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    this.orderProducts = this.publicService.orderProductValue;
    fromEvent(document, 'scroll').subscribe(
      res => {
        const coordY = window.scrollY;
        if(coordY === 0){
          this.scrollDown = false;
        } else {
          this.scrollDown = true;
        }
      }
    )
  }

  directToLogin() {
    const modalLogin = this.modalService.show(LoginCustomerComponent, {
      class: "modal-md modal-dialog-centered",
    });

    modalLogin.content.result.subscribe(
      result => {
        if (result) {
          this.currentUser = result;
        }
      }
    )
  }

  logout() {
    const confirmLogout = this.modalService.show(ConfirmModalComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        title: 'Đăng xuất tài khoản',
        message: `Đăng xuất sẽ khiến các thông tin lưu trữ của bạn bị xóa. Bạn có chắc?`
      }
    });
    confirmLogout.content.result.subscribe(
      isConfirm => {
        if (isConfirm) {
          this.spinner.show();
          const body = {
            _id: this.currentUser._id,
            token: localStorage.getItem('token')
          }
          this.authService.logout(body).subscribe(
            res => {
              this.currentUser = null;
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              this.authService.setCurrentUserValue(null);
              this.spinner.hide();
            },
            err => {
              this.spinner.hide();
              this.alertService.success(err);
            }
          )
        }
      }
    )
  }

  openUserDetails(){
    this.modalService.show(ModalUserComponent, {
      class: "modal-md modal-dialog-centered",
      initialState: {
        currentUser: this.currentUser
      }
    })
  }

}
