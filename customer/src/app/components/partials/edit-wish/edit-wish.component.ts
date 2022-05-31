import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, MinValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { WishModel } from 'src/app/models/wish.model';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-edit-wish',
  templateUrl: './edit-wish.component.html',
  styleUrls: ['./edit-wish.component.scss']
})
export class EditWishComponent implements OnInit {
  wishEditForm: FormGroup
  id: string|null = null

  editLoading = false

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private wishService: WishService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.wishEditForm = new FormGroup({
      notificationMethod: new FormGroup({
        email: new FormControl(false, Validators.required),
        sms: new FormControl(false, Validators.required),
        pushNotification: new FormControl(false, Validators.required)
      }),
      notificationCondition: new FormGroup({
        minPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
        maxPrice: new FormControl(null, Validators.required),
        hasPromotion: new FormControl(false, Validators.required),
        hasStock: new FormControl(false, Validators.required)
      })
    })
  }

  //---------lifecycle--------//
  ngOnInit(): void {
    this.id = this.activeRouter.snapshot.paramMap.get('id')

    if (this.id) {
      this.spinner.show()
      this.wishService.getWishDetails(this.id).subscribe(
        (response: any) => {
          this.spinner.hide()
          this.getNotificationMethodForm.setValue(response.data.notificationMethod)
          this.getNotificationConditionForm.setValue(response.data.notificationCondition)
        },
        (error: any) => {
          this.spinner.hide()
          this.toastr.error('Load wish failed', 'Error')
        }
      )
    }
  }

  //-----------handle---------//
  get getNotificationMethodForm(): FormGroup {
    return this.wishEditForm.get('notificationMethod') as FormGroup
  }

  get getNotificationConditionForm(): FormGroup {
    return this.wishEditForm.get('notificationCondition') as FormGroup
  }

  get getEmail(): AbstractControl {
    return this.getNotificationMethodForm.get('email')!
  }

  get getSMS(): AbstractControl {
    return this.getNotificationMethodForm.get('sms')!
  }

  get getPushNotification(): AbstractControl {
    return this.getNotificationMethodForm.get('pushNotification')!
  }

  get getMinPrice(): AbstractControl {
    return this.getNotificationConditionForm.get('minPrice')!
  }

  get getMaxPrice(): AbstractControl {
    return this.getNotificationConditionForm.get('maxPrice')!
  }

  get getHasPromotion(): AbstractControl {
    return this.getNotificationConditionForm.get('hasPromotion')!
  }

  get getHasStock(): AbstractControl {
    return this.getNotificationConditionForm.get('hasStock')!
  }

  checkMinValueMaxPrice() {
    this.getMaxPrice.setValidators(
      Validators.min(
        parseInt(this.getMinPrice.value ?? 0)
      )
    )
  }

  handleSubmit() {
    this.wishEditForm.markAllAsTouched()

    if (this.wishEditForm.invalid) return

    if (this.id) {
      this.editLoading = true
      this.wishService.editWish(this.wishEditForm.value, this.id)
      .subscribe(
        (response: any) => {
          this.editLoading = false
          this.toastr.success('Edit wish successfully', 'Success')
          this.router.navigate(['main', 'wish'])
        },
        (error: any) => {
          this.editLoading = false
          this.toastr.error('Edit wish failed', 'Error')
        }
      )
    } else {
      this.toastr.error("Don't have wish id")
    }
  }
}
