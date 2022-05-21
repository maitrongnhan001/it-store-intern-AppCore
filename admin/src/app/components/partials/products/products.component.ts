import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  listProduct: ProductModel[] = []
  loading = false
  searchLoading= false
  deleteProductLoading: string | null = null
  searchForm: FormGroup

  constructor(
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(null)
    })
  }
  //--------lifecycle---------//
  ngOnInit(): void {
    this.loading = true
    this.productService.getProducts().subscribe(
      (response: any) => {
        this.loading = false
        this.listProduct = response.data
      },
      (error: any) => {
        this.loading = false
        this.toastr.error("Can't loading product", 'Error')
      }
    )
  }

  //--------handle---------//
  handleSearch() {
    this.searchLoading = true
    const value = this.searchForm.value.search
     this.productService.searchProduct(value).subscribe(
      (response: any) => {
        this.searchLoading = false
        this.listProduct = response.data
        if (response.data.length == 0) {
          this.toastr.warning("No results ware found", "Search")
        }
      },

      (error) => {
        this.searchLoading = false
        this.toastr.error("Can't loading product", 'Error')
      }
     )
  }

  handleClickProductDetails(id: string) {
    this.router.navigate(['main', 'product-details', id])
  }

  handleRemoveProduct(event: any, id: string) {
    this.deleteProductLoading = id
    event.stopPropagation();
    this.productService.removeProduct(id).subscribe(
      (response: any) => {
        this.deleteProductLoading = null
        const index = this.listProduct.findIndex(product => product._id == id)
        let newListProducts = [...this.listProduct]
        newListProducts.splice(index, 1)
        this.listProduct = newListProducts
        this.toastr.success('Delete category successfully', 'Success')
      },
      (error: any) => {
        this.deleteProductLoading = null
        this.toastr.error('Delete category failed', 'Error')
      }
    )
  }

  handleUpdateProduct(event: any, id: string) {
    event.stopPropagation()
    this.router.navigate(['main', 'edit-product', id])
  }
}
