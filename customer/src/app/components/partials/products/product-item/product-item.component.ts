import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartItemModel } from 'src/app/models/cart.model';
import { ProductModel } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product!: ProductModel

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private cartService: CartService
  ) { }

  //-------------lifecycle------------//
  ngOnInit(): void {
  }

  //---------------handle-------------//
  handleShowDetails() {
    this.router.navigate(['main', 'product-details', this.product._id])
  }

  handleAddCart(event: any) {
    event.stopPropagation()
    
    const cartItem: CartItemModel = {
      check: true,
      productId: this.product._id,
      quantity: 1
    }

    this.cartService.addCartItem(cartItem)
    this.toastr.success(`Add "${this.product?.name}" to cart successfully`, 'Success')
  }
}
