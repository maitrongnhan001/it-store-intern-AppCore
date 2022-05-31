import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup
  email: string|null = null
  resetPasswordToken: string|null = null
  checkConfirmPassword = true

  loading = false

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.resetPasswordForm = new FormGroup({
      newPassword: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmNewPassword: new FormControl(null, [Validators.required, Validators.minLength(8)])
    })
  }

  //---------lifecycle--------//
  ngOnInit(): void {
    this.authService.getOwnProfile().subscribe(
      (response: any) => {
        this.email = response.data.email

        if (this.email) {
          this.authService.getResetPasswordToken(this.email).subscribe(
            (response: any) => {
              this.resetPasswordToken = response.data.resetPasswordToken
            },
            (error) => {
              this.toastr.error('Load reset password token failed', 'Error')
            }
          )
        }

      },
      (error) => {
        this.toastr.error('Load user email failed', 'Error')
      }
    )
  }

  //----------handle----------//
  get getNewPassword(): AbstractControl {
    return this.resetPasswordForm.get('newPassword')!
  }

  get getConfirmNewPassword(): AbstractControl {
    return this.resetPasswordForm.get('confirmNewPassword')!
  }

  checkConfirmMatch() {
    this.checkConfirmPassword = this.getNewPassword.value == this.getConfirmNewPassword.value
  }

  handleSubmit() {
    this.resetPasswordForm.markAllAsTouched()

    if (this.resetPasswordForm.invalid && this.checkConfirmMatch) return

    if (this.resetPasswordToken) {
      this.loading = true
      this.authService.resetPassword(this.getNewPassword.value, this.resetPasswordToken)
      .subscribe(
        (response: any) => {
          this.loading = false
          this.toastr.success('Update password successfully', 'Success')
        },
        (error: any) => {
          this.loading = false
          this.toastr.error('Update password failed', 'Error')
        }
      )
    } 
  }

}
