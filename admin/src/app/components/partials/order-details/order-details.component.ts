import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailsModel } from 'src/app/models/order.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderDetails: OrderDetailsModel|null = null
  id: string

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id') as string
  }

  //---------lifecycle----------//
  ngOnInit(): void {
    this.spinner.show()
    this.orderService.getOrderDetails(this.id).subscribe(
      (response: any) => {
        this.spinner.hide()
        this.orderDetails = response.data
      },
      (error: any) => {
        this.spinner.hide()
        this.toastr.error("Can't loading order", 'Error')
      }
    )
  }

}
