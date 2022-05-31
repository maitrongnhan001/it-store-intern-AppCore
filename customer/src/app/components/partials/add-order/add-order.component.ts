import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderCreateModel, orderTempModel } from 'src/app/models/order.model';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {
  orderTemp: orderTempModel | null = null
  loading = false

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private orderService: OrderService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const orderLocalStorage = localStorage.getItem('orderTemp')
    if (orderLocalStorage) {
      this.orderTemp = JSON.parse(orderLocalStorage)
    } else {
      this.router.navigate(['main'])
      this.toastr.error("Haven't selected any product")
    }

    this.invokeStripe()
  }

  makePayment() {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51KxEc0JsyzcmxeMthvDJvy8lLHbDXIU3uggTgPC4oXvUDwL1DNt7srJwYKzzJyG7NLDv9MjprFy7DZPgoHxieMaS00tFsI8FNI',
      locale: 'auto',
      token: (stripeToken: any) => {
        console.log(stripeToken)
        this.toastr.info('Stripe token generated!', 'Notification')
        const obj = { ...this.orderTemp }
        delete obj.total
        const data = { ...obj, paymentMethodId: 'pm_1L2FkYJsyzcmxeMtGg6XH3z4', notes: '' }
        this.orderService.addOrder(data as OrderCreateModel).subscribe(
          (res) => {
            console.log(res)
          }
        )
        this.toastr.success('Order successfully', 'Success')
        localStorage.removeItem('orderTemp')
        this.orderTemp?.items.forEach(item => {
          this.cartService.removeCartItem(item.productId)
        })
        this.router.navigate(['main'])
      }
    })

    paymentHandler.open({
      name: this.orderTemp?.address.fullName,
      description: '',
      amount: this.orderTemp?.total,
      country: 'AUD'
    })
  }

  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script')
      script.id = 'strip-script'
      script.type = 'text/javascript'
      script.src = ""
      window.document.body.appendChild(script)
    }
  }
}