import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { CategoryModel } from 'src/app/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  listCategory: CategoryModel[] = []
  loading = false
  searchLoading= false
  deleteCategoryLoading: string | null = null
  searchForm: FormGroup
  page = 1
  totalPage = 0

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.searchForm = new FormGroup({
      search: new FormControl(null)
    })
  }

  //----------lifecycle----------//
  ngOnInit(): void {
    this.loading = true
    this.categoryService.getCategories(this.page, 10).subscribe(
      (response: any) => {
        this.loading = false
        this.listCategory = response.data
        this.page = response.page
        this.totalPage = response.totalPage
      },

      (error) => {
        this.loading = false
        this.showError()
      }
    )
  }

  //-----------handle------------//
  showError() {
    this.toastr.error("Can't loading categories", 'Error')
  }

  showWaring() {
    this.toastr.warning("No results ware found", "Search")
  }

  handleSearch() {
    this.searchLoading = true
    const value = this.searchForm.value.search
     this.categoryService.searchCategory(value).subscribe(
      (response: any) => {
        this.searchLoading = false
        this.listCategory = response.data
        if (response.data.length == 0) {
          this.showWaring()
        }
      },

      (error) => {
        this.searchLoading = false
        this.showError()
      }
     )
  }

  handleDeleteCategory(id: string) {
    this.deleteCategoryLoading = id
    this.categoryService.deleteCategory(id).subscribe(
      (response: any) => {
        this.deleteCategoryLoading = null
        const index = this.listCategory.findIndex(category => category._id == id)
        let newListCategory = [...this.listCategory]
        newListCategory.splice(index, 1)
        this.listCategory = newListCategory
        this.toastr.success('Delete category successfully', 'Success')
      },
      (error: any) => {
        this.deleteCategoryLoading = null
        this.toastr.error('Delete category failed', 'Error')
      }
    )
  }

  handleShowMore() {
    this.loading = true
    this.categoryService.getCategories(this.page + 1, 10).subscribe(
      (response: any) => {
        this.loading = false
        this.listCategory = [...this.listCategory ,...response.data]
        this.page = response.page
        this.totalPage = response.totalPage
      },

      (error) => {
        this.loading = false
        this.showError()
      }
    )
  }

  clickEdit(id: string) {
    this.router.navigate(['main', 'edit-category', id])
  }
}
