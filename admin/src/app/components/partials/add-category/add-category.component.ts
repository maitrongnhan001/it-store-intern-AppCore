import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  id: string|null
  title = 'Add category'

  constructor(
    private router: Router,
    private uploadImageService: UploadImageService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id');
    this.addCategoryForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null)
    })
  }

  //-------lifecycle--------//
  ngOnInit(): void {
    if (this.id) {
      this.title = 'Edit category'
      this.categoryService.getCategoryById(this.id).subscribe(
        (response: any) => {
          this.getName.setValue(response.data.name)
          this.getDescription.setValue(response.data.description)
          this.image = (response.data.image.length == 0) ?
          null : response.data.image
        },
        (error: any) => {
          this.toastr.error('Delete category failed', 'Error')
        }
      )
    }
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
    this.addCategoryForm.markAllAsTouched()
    if (this.addCategoryForm.invalid) return

    this.uploadCategoryLoading = true
    let categoryData = {
      name: this.getName.value,
      description: this.getDescription.value ?? '',
      image: this.image ?? ''
    }
    if (this.id) {
      //edit
      this.categoryService.editCategory(categoryData, this.id).subscribe(
        (response: any) => {
          this.uploadCategoryLoading = false
          this.toastr.success('Edit category successfully', 'Success')
          this.router.navigate(['main'])
        },
        (error: any) => {
          this.uploadCategoryLoading = false
          this.toastr.error('Edit category failed', 'Error')
        }
      )
    } else {
      //add
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
}
