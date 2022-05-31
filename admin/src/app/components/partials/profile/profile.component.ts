import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PasswordService } from 'src/app/services/password.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  resetPasswordForm: FormGroup
  isMatch = true
  resetPasswordToken: string = ''

  loading = false

  constructor(
    private route: Router,
    private passwordService: PasswordService,
    private toastr: ToastrService
  ) {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl(null, Validators.required),
      confirmPassword: new FormControl(null, Validators.required)
    })
  }

  //-------lifecycle--------//
  ngOnInit(): void {
    this.passwordService.getResetPasswordToken().subscribe(
      (response: any) => {
        this.resetPasswordToken = response.data.resetPasswordToken
      },
      (error: any) => {
        this.toastr.error('Get token failed', 'Error')
      }
    )
  }

  //---------handle---------//
  get getPassword(): AbstractControl {
    return this.resetPasswordForm.get('password')!
  }

  get getConfirmPassword(): AbstractControl {
    return this.resetPasswordForm.get('confirmPassword')!
  }

  checkPassword() {
    return this.getPassword.value === this.getConfirmPassword.value
  }

  handleSubmit() {
    this.resetPasswordForm.markAllAsTouched()
    this.isMatch = this.checkPassword()
    if (this.getConfirmPassword.invalid || !this.checkPassword()) return

    this.loading = true
    this.passwordService.resetPassword(this.getPassword.value, this.resetPasswordToken).subscribe(
      (response: any) => {
        this.loading = false
        this.toastr.success('Reset password successfully', 'Success')
        this.route.navigate(['main', 'profile'])
      },
      (error: any) => {
        this.loading = false
        this.toastr.success('Reset password error', 'Error')
      }
    )
  }
}
