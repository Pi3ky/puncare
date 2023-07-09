import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { finalize } from 'rxjs/operators';
import { AlertService } from 'src/app/_services/alert.service';
import { AuthService } from 'src/app/_services/auth-services.service';
import { PublicService } from 'src/app/_services/public.service';
import { District, Ward } from 'src/app/common/type';

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
  dataDistricts: District[] = [];
  dataWards: Ward[] = [];
  constructor(
    private authService: AuthService,
    public bsModalRef: BsModalRef,
    public publicService: PublicService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    if(this.currentUser){
      this.getDistrict(this.currentUser.provinceId);
      this.getWard(this.currentUser.districtId);
    }
  }

  onSubmit(form) {
    form.control.markAllAsTouched();
    if (form.valid) {
      this.isLoading = true;
      this.authService.updateUser(this.currentUser, this.currentUser._id).pipe(finalize(() => this.isLoading = false)).subscribe(
        res => {
          this.alertService.success("Cập nhật thành công thành công!");
        }, err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }

  specificProvince(evt) {
    this.currentUser.provinceName = evt.province_name;
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
    this.currentUser.districtName = evt.district_name;
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
    this.currentUser.wardName = evt.ward_name;
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
          this.alertService.success("Đổi mật khẩu thành công!");
        }, err => {
          console.error(err);
          this.alertService.error(err.error)
        }
      )
    }
  }
}
