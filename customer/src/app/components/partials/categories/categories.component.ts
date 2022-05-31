import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CategoryModel } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  listCategories: CategoryModel[]  = []
  loading = false
  page = 1
  totalPage = 0

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {}

  //------------lifecycle-------------//
  ngOnInit(): void {
    this.loading = true
    this.categoryService.getCategory(this.page, 10).subscribe(
      (response: any) => {
        this.loading = false
        this.listCategories = response.data
        this.page = response.page
        this.totalPage = response.totalPage
      },
      (error: any) => {
        this.loading = false
        this.toastr.error('Load category failed')
      }
    )
  }

  //----------handle---------//
  handleShowMore() {
    this.loading = true
    this.categoryService.getCategory(this.page + 1, 10).subscribe(
      (response: any) => {
        this.loading = false
        this.listCategories = [...this.listCategories ,...response.data]
        this.page = response.page
        this.totalPage = response.totalPage
      },

      (error) => {
        this.loading = false
        this.toastr.error('Load category failed')
      }
    )
  }
}
