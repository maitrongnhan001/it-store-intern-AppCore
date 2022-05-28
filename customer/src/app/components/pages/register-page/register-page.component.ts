import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserRegisterModel } from 'src/app/models/auth.model';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  userRegisterForm: FormGroup

  loading = false

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.userRegisterForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      phone: new FormControl(null),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      dob: new FormControl(null),
      gender: new FormControl(null)
    })
  }

  //--------lifecycle-------//
  ngOnInit(): void {}

  //---------handle--------//
  get getEmail(): AbstractControl {
    return this.userRegisterForm.get('email')!
  }

  get getPassword(): AbstractControl {
    return this.userRegisterForm.get('password')!
  }

  get getPhone(): AbstractControl {
    return this.userRegisterForm.get('phone')!
  }

  get getFirstName(): AbstractControl {
    return this.userRegisterForm.get('firstName')!
  }

  get getLastName(): AbstractControl {
    return this.userRegisterForm.get('lastName')!
  }

  get getDOB(): AbstractControl {
    return this.userRegisterForm.get('dob')!
  }

  get getGender(): AbstractControl {
    return this.userRegisterForm.get('gender')!
  }

  handleSubmit() {
    this.userRegisterForm.markAllAsTouched()
    if (this.userRegisterForm.invalid) return

    this.loading = true
    const data: UserRegisterModel = this.userRegisterForm.value
    this.authService.register(data).subscribe(
        (response:any) => {
          this.loading = false
          console.log(response)
          this.toastr.success('Register account successfully', 'Success')
          this.router.navigate(['login'])
        },
        (error: any) => {
          this.loading = false
          this.toastr.error('Register account failed. Try again, please', 'Error')
        }
    )
  }
}
