import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { addressModel } from 'src/app/models/address.model';
import { CartItemModel } from 'src/app/models/cart.model';
import { ProductDetailsModel } from 'src/app/models/product.model';
import { AddressService } from 'src/app/services/address.service';
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
  addresses: addressModel[] = []
  total = 0
  address: number | null = null

  loading = false

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private addressService: AddressService
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
            this.handleTotal()
            if (index == (this.cart.length - 1)) this.spinner.hide()
          },
          (error: any) => {
            this.toastr.error("Load product is failed");
          }
        )
    }

    this.addressService.getAddress().subscribe(
      (response: any) => {
        this.addresses = response.data
        this.address = this.addresses.findIndex(address => address.isDefault)
      },
      (error: any) => {
        this.toastr.error('Load addresses failed')
      }
    )
  }

  //------------handle------------//
  handleShowDetails(productId: string) {
    this.router.navigate(['main', 'product-details', productId])
  }

  handleCheckCartItem(event: any, index: number) {
    event.stopPropagation()
    this.cart[index].check = !this.cart[index].check
    this.handleTotal()
  }

  handleCheckAll() {
    this.cart = this.cart.map(element => {
      return { ...element, check: true }
    })
    this.handleTotal()
  }

  handleRemoveCartItem(event: any, index: number) {
    event.stopPropagation()

    const productName = this.listProduct[index].name
    const productId = this.listProduct[index]._id
    this.listProduct.splice(index, 1)
    this.cartService.removeCartItem(productId)
    this.handleTotal()
    this.toastr.success(`remove "${productName} successfully"`, 'Success')
  }

  handleAddQuantity(event: any, productId: string) {
    event.stopPropagation()
    this.cartService.addCartItem({ check: true, productId: productId, quantity: 1 })
    this.handleTotal()
  }

  handleSubQuantity(event: any, productId: string) {
    event.stopPropagation()
    const resultSubQuantity = this.cartService.subQuantityCartItem(productId)
    this.handleTotal()
    if (!resultSubQuantity.status) {
      this.toastr.error(resultSubQuantity.msg, 'Error')
    }
  }

  handleTotal() {
    let totalTemp = 0
    for (let i = 0; i < this.cart.length; i++) {
      if (this.cart[i].check) {
        totalTemp += this.listProduct[i].price * this.cart[i].quantity
      }
    }

    this.total = totalTemp
  }

  updateAddress(index: number) {
    this.address = index
  }

  handleOrder() {
    const data = {
      items: this.cart.map(
        (item: any) => {
          if (!item.check)
            return
          return { productId: item.productId, quantity: item.quantity }
        }),
      address: this.addresses[this.address as number],
      total: this.total
    }

    localStorage.setItem('orderTemp', JSON.stringify(data))

    this.router.navigate(['main', 'order'])
  }
}
