import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/category.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup
  image: string | null = null
  uploadImageLoading = false
  uploadCategoryLoading = false

  constructor(
    private router: Router,
    private uploadImageService: UploadImageService,
    private categoryService: CategoryService,
    private toastr: ToastrService
  ) {
    this.addCategoryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null)
    })
  }

  //-------lifecycle--------//
  ngOnInit(): void {
  }

  //---------handle---------//
  get getName(): AbstractControl {
    return this.addCategoryForm.get('name')!
  }

  get getDescription(): AbstractControl {
    return this.addCategoryForm.get('description')!
  }

  handleUploadImage(event: any) {
    this.uploadImageLoading = true
    if (event.target.files && event.target.files[0]) {
      const categoryImage = event.target.files[0]
      this.uploadImageService.uploadImage(categoryImage).subscribe(
        (response: any) => {
          this.uploadImageLoading = false
          this.toastr.success('Photo upload successfully')
          this.image = response.data.secure_url
        },
        (error: any) => {
          this.uploadImageLoading = false
          this.toastr.error('Photo upload failed')
        }
      )
    }
  }

  handleSubmitCategory() {
    this.uploadCategoryLoading = true
    this.addCategoryForm.markAllAsTouched()
    if (this.addCategoryForm.invalid) return

    let categoryData = {
      name: this.getName.value,
      description: this.getDescription.value ?? '',
      image: this.image ?? ''
    }
    this.categoryService.addCategory(categoryData).subscribe(
      (response: any) => {
        this.uploadCategoryLoading = false
        this.toastr.success('Add category successfully', 'Success')
        this.router.navigate(['main'])
      },
      (error: any) => {
        this.uploadCategoryLoading = false
        this.toastr.error('Add category failed', 'Error')
      }
    )
  }
}
