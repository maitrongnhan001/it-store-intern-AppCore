import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  listProducts: ProductModel[] = []
  loading = false
  page = 1
  totalPage = 0

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.productService.getProduct(this.page, 10).subscribe(
      (response: any) => {
        this.listProducts = response.data
        this.loading = false
        this.page = response.page
        this.totalPage = response.totalPage
      },
      (error: any) => {
        this.loading = false
        this.toastr.error('Load product failed')
      }
    )
  }
  //---------handle-----------//
  scroll(e: HTMLElement) {
    e.scrollIntoView()
  }

  handleShowMore() {
    this.loading = true
    this.productService.getProduct(this.page + 1, 10).subscribe(
      (response: any) => {
        this.loading = false
        this.listProducts = [...this.listProducts ,...response.data]
        this.page = response.page
        this.totalPage = response.totalPage
      },

      (error) => {
        this.loading = false
        this.toastr.error("Can't loading orders", 'Error')
      }
    )
  }
}
