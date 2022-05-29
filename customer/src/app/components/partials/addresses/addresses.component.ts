import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { addressModel } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  litsAddresses: addressModel[] = []

  loading = false
  removeLoading: string | null = null
  checkDefaultLoading: string|null = null

  constructor(
    private addressService: AddressService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  //----------lifecycle----------//
  ngOnInit(): void {
    this.loading = true
    this.addressService.getAddress().subscribe(
      (response: any) => {
        this.loading = false
        this.litsAddresses = response.data
      },
      (error: any) => {
        this.loading = false
        this.toastr.error('Load addresses failed', 'Error')
      }
    )
  }


  //-----------handle-----------//
  handleCheckDefault(index: number, id: string) {
    const listAddressesTemp = [...this.litsAddresses]
    this.checkDefaultLoading = id
    this.litsAddresses = listAddressesTemp.map(
      (address: addressModel) => {
        return {
          ...address,
          isDefault: (address._id === id)
        }
      })
      
    this.addressService.editAddress(this.litsAddresses[index], id).subscribe(
      (response: any) => {
        this.checkDefaultLoading = null
        this.toastr.success('Update address default successfully', 'Success')
      },
      (error: any) => {
        this.checkDefaultLoading = null
        this.toastr.error('Update address default failed', 'Error')
      }
    )
  }

  handleClickEdit(id: string) {
    this.router.navigate(['main', 'edit-address', id])
  }

  handleClickRemove(id: string) {
    this.removeLoading = id
    this.addressService.removeAddress(id).subscribe(
      (response: any) => {
        this.removeLoading = null
        const index = this.litsAddresses.findIndex(address => address._id == id)
        this.litsAddresses.splice(index, 1)
        this.toastr.success('Remove address successfully', 'Success')
      },
      (error: any) => {
        this.removeLoading = null
        this.toastr.error('Remove address failed', 'Error')
      }
    )
  }
}
