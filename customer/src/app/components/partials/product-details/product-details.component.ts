import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartItemModel } from 'src/app/models/cart.model';
import { ProductDetailsModel } from 'src/app/models/product.model';
import { WishModel } from 'src/app/models/wish.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { WishService } from 'src/app/services/wish.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productDetails: ProductDetailsModel|null = null
  id: string

  wishLoading = false
  wishClass = 'btn-outline-danger'
  wishStatus = false

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private cartService: CartService,
    private wishService: WishService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string
  }

  //-------lifecycle-------//
  ngOnInit(): void {
    this.spinner.show()
    this.productService.getProductDetails(this.id).subscribe(
      (response: any) => {
        this.spinner.hide()
        this.productDetails = response.data
      },
      (error: any) => {
        this.spinner.hide()
        this.toastr.error("Can't loading product", 'Error')
      }
    )
    this.wishService.getWishes().subscribe(
      (response: any) => {
        this.wishLoading = false
        const wishList = response.data;
        wishList.forEach((wish: WishModel) => {
          if (wish.product._id === this.id) {
            this.wishStatus = true
            this.wishClass = 'btn-danger'
          }
        })
      },
      (error) => {
        this.wishLoading = false
      }
    )
  }
  //-------handle-------//
  changeImage(url: string) {
    if (this.productDetails != null) {
      this.productDetails.image = url
    }
  }

  handleAddCart() {
    const cartItem: CartItemModel = {
      check: true,
      productId: this.id,
      quantity: 1
    }

    this.cartService.addCartItem(cartItem)
    this.toastr.success(`Add "${this.productDetails?.name}" to cart successfully`, 'Success')
  }

  handleClickWish(status: boolean) {
    this.wishLoading = true
    this.wishLoading = true
    if (status) {
      //add
      this.wishService.addWish(this.id).subscribe(
        (response: any) => {
          this.wishLoading = false
          this.wishStatus = true
          this.wishClass = 'btn-danger'
        },
        (error: any) => {
          this.wishLoading = false
          this.toastr.error('Add to wish list is failed', 'Error')
          if (error.status === 401) {
            this.toastr.error('You must login to use this feature', 'Error')
          }
        }
      )
    } else {
      //remove
      this.wishService.removeWish(this.id).subscribe(
        (response: any) => {
          this.wishLoading = false
          this.wishStatus = false
          this.wishClass = 'btn-outline-danger'
        },
        (error: any) => {
          this.wishLoading = false
          this.toastr.error('Remove to wish list is failed', 'Error')
          if (error.status === 401) {
            this.toastr.error('You must login to use this feature', 'Error')
          }
        }
      )
    }
  }
}
