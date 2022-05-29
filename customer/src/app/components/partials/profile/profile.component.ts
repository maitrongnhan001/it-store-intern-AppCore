import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userUpdateForm: FormGroup
  avatar: string|null = null

  uploadImageLoading = false

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private uploadService: UploadService
  ) {
    this.userUpdateForm = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required)
    })
  }


  //-------lifecycle-------//
  ngOnInit(): void {
    this.spinner.show()
    this.authService.getOwnProfile().subscribe(
      (response: any) => {
        this.getFirstName.setValue(response.data.firstName)
        this.getLastName.setValue(response.data.lastName)
        this.getPhone.setValue(response.data.phone)
        this.getDOB.setValue(formatDate(response.data.dob as string, 'yyyy-MM-dd', 'en-US'))
        this.getGender.setValue(response.data.gender)
        this.avatar = response.data.avatar ?? null
        this.spinner.hide()
      },
      (error: any) => {
        this.toastr.error('Load own profile failed', 'Error')
        this.spinner.hide()
      }
    )
  }

  //---------handle--------//
  get getFirstName(): AbstractControl {
    return this.userUpdateForm.get('firstName')!
  }

  get getLastName(): AbstractControl {
    return this.userUpdateForm.get('lastName')!
  }

  get getPhone(): AbstractControl {
    return this.userUpdateForm.get('phone')!
  }

  get getDOB(): AbstractControl {
    return this.userUpdateForm.get('dob')!
  }

  get getGender(): AbstractControl {
    return this.userUpdateForm.get('gender')!
  }

  handleLogout() {
    this.authService.logout()
    this.router.navigate(['login'])
  }

  handleUploadImage(event: any) {
    this.uploadImageLoading = true
    if (event.target.files && event.target.files[0]) {
      const categoryImage = event.target.files[0]
      this.uploadService.uploadImage(categoryImage).subscribe(
        (response: any) => {
          this.uploadImageLoading = false
          this.toastr.success('Photo upload successfully')
          this.avatar = response.data.secure_url
        },
        (error: any) => {
          this.uploadImageLoading = false
          this.toastr.error('Photo upload failed')
        }
      )
    }
  }

  handleSubmit() {
    this.userUpdateForm.markAllAsTouched()

    if (this.userUpdateForm.invalid) return

    const data = this.userUpdateForm.value

    if (this.avatar) {
      data.avatar = this.avatar
    }

    this.authService.editOwnProfile(data).subscribe(
      (response: any) => {
        this.toastr.success("Update own profile successfully", "Success")
      },
      (error: any) => {
        this.toastr.error("Update own profile failed", "Error")
      }
    )
  }
}
