import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { orderModel } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {
  orders: orderModel[] = []

  loading = false

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loading = true
    this.orderService.getOrders().subscribe(
      (response: any) => {
        this.loading = false
        this.orders = response.data
        console.log(response)
      },
      (error) => {
        this.loading = false
        this.toastr.error('load order history failed', 'Error')
      }
    )
  }

}
