import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth-services.service';

@Component({
  selector: 'app-login-customer',
  templateUrl: './login-customer.component.html',
  styleUrls: ['./login-customer.component.scss']
})
export class LoginCustomerComponent implements OnInit {
  result = new Subject<any>();
  loginMode: boolean = true;
  isLoading: boolean = false;
  selectedType: boolean = false;
  submitRegister: boolean = false;
  activeForgotPW: boolean = false;
  loginForm = {
    email: '',
    password: ''
  }
  registerForm = {
    email: '',
    password: '',
    address: '',
    name: '',
    phone: '',
    district: '',
    city: ''
  }
  forgotForm = {
    email: ''
  }
  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit() {
  }

  selectForm(type) {
    this.selectedType = true;
    this.loginMode = type;
    this.activeForgotPW = false;
  }

  onSubmitLogin(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.isLoading = true;
      this.authService.createSession(this.loginForm).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          this.result.next(res.user);
          this.authService.setCurrentUserValue(res.user);
          localStorage.setItem('token', res.token);
          this.alertService.success(`Xin chào ${res.user.name}!`);
          this.bsModalRef.hide();
        }, err => {
          this.alertService.error(err.error);
          console.error(err.error);
        }
      )
    }
  }

  onSubmitRegister(form) {
    form.control.markAllAsTouched();
    this.submitRegister = true;
    if (form.valid) {
      this.isLoading = true;
      this.authService.createUser(this.registerForm).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          this.loginMode = true;
          this.activeForgotPW = false;
        }, err => {
          this.alertService.error(err.error);
          console.error(err);
        }
      )
    }
  }

  directToForgotPW() {
    this.activeForgotPW = true;
  }

  backType() {
    if (this.activeForgotPW) {
      this.activeForgotPW = false;
    } else {
      this.selectedType = false;
    }
  }

  onSubmitForgotPW(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.isLoading = true;
      this.authService.forgotPassword(this.forgotForm).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          this.alertService.success(res);
        }, err => {
          console.error(err)
          this.alertService.error(err.error);
        }
      )
    }
  }
}
