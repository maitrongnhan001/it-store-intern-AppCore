import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrderModel } from 'src/app/models/order.model';
import { ProductDetailsModel } from 'src/app/models/product.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  productDetail: ProductDetailsModel|null = null
  orders: OrderModel[] = []
  searchForm: FormGroup
  
  loading = false
  searchLoading = false

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private orderService: OrderService
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(null)
    })
  }

  //--------lifecycle----------//
  ngOnInit(): void {
    this.loading = true
    this.orderService.getOrders().subscribe(
      (response: any) => {
        this.loading = false
        this.orders = response.data
      },
      (error) => {
        this.loading = false
        this.toastr.error("Can't loading orders", 'Error')
      }
    )
  }

  //----------handle---------//
  handleSearch() {
    this.searchLoading = true
    const value = this.searchForm.value.search
     this.orderService.searchOrder(value).subscribe(
      (response: any) => {
        this.searchLoading = false
        this.orders = response.data
        if (response.data.length == 0) {
          this.toastr.warning("No results ware found", "Search")
        }
      },

      (error) => {
        this.searchLoading = false
        this.toastr.error("Can't loading orders", 'Error')
      }
     )
  }

  handleOrderDetails(id: string) {
    this.router.navigate(['main', 'order-details', id])
  }

}
