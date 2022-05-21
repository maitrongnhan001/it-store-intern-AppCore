import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProductDetailsModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productDetails: ProductDetailsModel|null = null
  id: string

  constructor(
    private productService: ProductService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
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
  }
  //-------handle-------//
  changeImage(url: string) {
    if (this.productDetails != null) {
      this.productDetails.image = url
    }
  }
}
