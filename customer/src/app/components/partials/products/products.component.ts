import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  listProducts: ProductModel[] = []
  loading = false

  constructor(
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loading = true
    this.productService.getProduct().subscribe(
      (response: any) => {
        this.listProducts = response.data
        this.loading = false
      },
      (error: any) => {
        this.loading = false
        this.toastr.error('Load product failed')
      }
    )
  }

}
