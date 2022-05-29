import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CartItemModel } from 'src/app/models/cart.model';
import { ProductDetailsModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cart: CartItemModel[] = []
  listProduct: ProductDetailsModel[] = []

  loading = false

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  //----------lifecycle---------//
  ngOnInit(): void {
    if (this.cart.length > 0) {
      this.spinner.show()
    }
    this.cart = this.cartService.getAll()

    for (let [index, cartItem] of this.cart.entries()) {
      this.productService
        .getProductDetails(cartItem.productId)
        .subscribe(
          (response: any) => {
            this.listProduct.push(response.data)
            if (index == (this.cart.length - 1)) this.spinner.hide()
          },
          (error: any) => {
            this.toastr.error("Load product is failed");
          }
        )
    }
  }

  //------------handle------------//
  handleShowDetails(productId: string) {
    this.router.navigate(['main', 'product-details', productId])
  }

  handleCheckCartItem(event: any, index: number) {
    event.stopPropagation()
    this.cart[index].check = !this.cart[index].check
  }

  handleCheckAll() {
    this.cart = this.cart.map(element => {
      return { ...element, check: true }
    })
  }

  handleRemoveCartItem(event: any, index: number) {
    event.stopPropagation()
    
    const productName = this.listProduct[index].name
    const productId = this.listProduct[index]._id
    this.listProduct.splice(index, 1)
    this.cartService.removeCartItem(productId)
    this.toastr.success(`remove "${productName} successfully"`, 'Success')
  }

  handleAddQuantity(event: any, productId: string) {
    event.stopPropagation()
    this.cartService.addCartItem({check: true, productId: productId, quantity: 1})
  }

  handleSubQuantity(event: any, productId: string) {
    event.stopPropagation()
    const resultSubQuantity = this.cartService.subQuantityCartItem(productId)
    if (!resultSubQuantity.status) {
      this.toastr.error(resultSubQuantity.msg, 'Error')
    }
  }
}
