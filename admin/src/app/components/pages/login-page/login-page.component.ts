import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  textErrorLogin: string | null = null
  loading = false

  //------------lifecycle------------//
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }

  //-------------form----------------//
  get getUsername(): AbstractControl {
    return this.loginForm.get('username')!
  }

  get getPassword(): AbstractControl {
    return this.loginForm.get('password')!
  }

  //------------handle------------//
  handleSubmit() {
    this.loginForm.markAllAsTouched();
    this.loading = true
    if (this.loginForm.invalid) return

    const loginData = this.loginForm.value
    this.authService.login(loginData)
      .subscribe(
        (resultLogin: any) => {
          this.loading = false
          console.log(resultLogin)
          const token = resultLogin.data.accessToken
          localStorage.setItem('token', token)
          this.router.navigate(['main'])
        },

        (error) => {
          if (error.status === 401) {
            this.loading = false
            this.textErrorLogin = 'User name or password is wrong'
          }
        })
  }

  ngOnInit(): void {
  }

}
