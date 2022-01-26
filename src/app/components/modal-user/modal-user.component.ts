import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth-services.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss']
})
export class ModalUserComponent implements OnInit {
  currentUser: any;
  isLoading = false;
  submitted = false;
  requestForm = {
    password: '',
    newPassword: '',
    cfNewPassword: ''
  }
  constructor(
    private authService: AuthService,
    public bsModalRef: BsModalRef,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    console.log(this.currentUser)
  }

  onSubmit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.isLoading = true;
      this.authService.updateUser(this.currentUser, this.currentUser._id).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          console.log(res)
          this.alertService.success("Cập nhật thành công thành công!");
        }, err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }

  submitChangePW(form) {
    form.control.markAllAsTouched();
    this.submitted = true;
    if (form.valid) {
      this.isLoading = true;
      const body = {
        password: this.requestForm.password,
        newPassword: this.requestForm.newPassword
      }
      this.authService.changePassword(body, this.currentUser._id).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          console.log(res)
          this.alertService.success("Đổi mật khẩu thành công!");
        }, err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }
}
