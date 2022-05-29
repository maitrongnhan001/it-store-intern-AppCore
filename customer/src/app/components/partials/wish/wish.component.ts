import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WishModel } from 'src/app/models/wish.model';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class WishComponent implements OnInit {
  wishList: WishModel[] = []

  loading = false
  removeLoading: string|null = null

  constructor(
    private wishService: WishService,
    private router: Router,
    private toast: ToastrService
  ) { }

  //---------lifecycle----------//
  ngOnInit(): void {
    this.loading = true
    this.wishService.getWishes().subscribe(
      (response: any) => {
        this.loading = false
        this.wishList = response.data
      },
      (error: any) => {
        this.loading = false
        this.toast.error('Load wishes failed', 'error')
      }
    )
  }

  //----------handle--------//
  handleRemoveWish(id: string) {
    this.removeLoading = id
    this.wishService.removeWish(id).subscribe(
      (response: any) => {
        this.removeLoading = null
        const index = this.wishList.findIndex(wish => {
          wish._id === id
        })
        this.wishList.splice(index, 1)
        this.toast.success('Remove wish successfully', 'Success')
      },
      (error: any) => {
        this.removeLoading = null
        this.toast.error('Remove wish failed', 'Error')
      }
    )
  }

  handleEditWish(id: String) {
    this.router.navigate(['main', 'edit-wish', id])
  }
}
