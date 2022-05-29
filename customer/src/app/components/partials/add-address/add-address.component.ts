import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {
  title = 'Add address'
  addressForm: FormGroup
  id: string|null = null

  uploadAddressLoading = false

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private toastr: ToastrService,
    private addressService: AddressService,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.activeRouter.snapshot.paramMap.get('id')
    this.addressForm = new FormGroup({
      fullName: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      ward: new FormControl(null, Validators.required),
      district: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      isDefault: new FormControl(true, Validators.required)
    })
  }

  //---------lifecycle--------//
  ngOnInit(): void {
    if (this.id) {
      this.title = "Edit address"
      this.spinner.show()
      this.addressService.getAddressById(this.id).subscribe(
        (response: any) => {
          this.spinner.hide()
          this.getFullName.setValue(response.data.fullName)
          this.getPhone.setValue(response.data.phone)
          this.getWard.setValue(response.data.ward)
          this.getAddress.setValue(response.data.address)
          this.getDistrict.setValue(response.data.district)
          this.getCity.setValue(response.data.city)
          this.getCountry.setValue(response.data.country)
          this.getIsDefault.setValue(response.data.isDefault)
        },
        (error: any) => {
          this.spinner.hide()
          this.toastr.error('Load address failed', 'Error')
        }
      )
    }
  }

  //-----------handle---------//
  get getFullName() :AbstractControl {
    return this.addressForm.get('fullName')!
  }

  get getPhone() :AbstractControl {
    return this.addressForm.get('phone')!
  }

  get getWard() :AbstractControl {
    return this.addressForm.get('ward')!
  }

  get getAddress() :AbstractControl {
    return this.addressForm.get('address')!
  }

  get getDistrict() :AbstractControl {
    return this.addressForm.get('district')!
  }

  get getCity() :AbstractControl {
    return this.addressForm.get('city')!
  }

  get getCountry() :AbstractControl {
    return this.addressForm.get('country')!
  }

  get getIsDefault() :AbstractControl {
    return this.addressForm.get('isDefault')!
  }

  handleSubmit() {
    this.addressForm.markAllAsTouched()
    if (this.addressForm.invalid) return

    this.uploadAddressLoading = true
    const data = this.addressForm.value

    if (this.id) {
      this.addressService.editAddress(data, this.id).subscribe(
        (response: any) => {
          this.uploadAddressLoading = false
          this.toastr.success('Edit address successfully', 'Success')
          this.router.navigate(['main', 'address'])
        },
        (error: any) => {
          this.uploadAddressLoading = false
          this.toastr.error('Edit address failed', 'Error')
        }
      )
    } else {
      this.addressService.addAddress(data).subscribe(
        (response: any) => {
          this.uploadAddressLoading = false
          this.toastr.success('Add address successfully', 'Success')
          this.router.navigate(['main', 'address'])
        },
        (error: any) => {
          this.uploadAddressLoading = false
          this.toastr.error('Add address failed', 'Error')
        }
      )
    }
  }

}
