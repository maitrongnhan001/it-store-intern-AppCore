import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  title = "Products"
  categoryId: string | null = null
  contentSearch: string | null = null
  listProducts: ProductModel[] = []

  loading = false

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private activeRouter: ActivatedRoute
  ) {
    this.categoryId = this
      .activeRouter
      .snapshot
      .paramMap
      .get('categoryId')

    this
      .activeRouter
      .queryParams
      .subscribe((params: any) => {
        this.contentSearch = params.search ?? null
      })
  }

  ngOnInit(): void {
    this.loading = true
    if (this.categoryId) {
      //load data in category
      this.productService
        .getProductByCategoryId(this.categoryId)
        .subscribe(
          (response: any) => {
            this.listProducts = response.data
            this.loading = false
          },
          (error: any) => {
            this.loading = false
            this.toastr.error('Load products failed')
          }
        )

      //load category
      this.categoryService
        .getCategoryDetails(this.categoryId)
        .subscribe(
          (response: any) => {
            this.title = `Products for category "${response.data.name}"`
            this.loading = false
          },
          (error: any) => {
            this.toastr.error('Load category name failed')
          }
        )

      return
    }

    if (this.contentSearch) {
      this.title = `Result for "${this.contentSearch}"`

      //get product by content search
      this.productService
        .getProductByContentSearch(this.contentSearch)
        .subscribe(
          (response: any) => {
            this.listProducts = response.data
            this.loading = false
          },
          (error: any) => {
            this.loading = false
            this.toastr.error('Load products failed')
          }
        )
      
      return
    }

    //get product by content search
    this.productService
    .getProduct()
    .subscribe(
      (response: any) => {
        this.listProducts = response.data
        this.loading = false
      },
      (error: any) => {
        this.loading = false
        this.toastr.error('Load products failed')
      }
    )
  }

}
