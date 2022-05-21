import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { map, tap } from 'rxjs';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductCreateModel, ProductImage } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  title = 'Add product'
  addProductForm: FormGroup
  productAvatar: string | null = null
  galleries: ProductImage[] = []
  listCategory: CategoryModel[] = []
  id: string|null = null
  initAvatarImage: string|null = null

  uploadImageLoading = false
  uploadProductLoading = false

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '300px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      [
        'bold',
        'italic'
      ],
      [
        'fontSize',
        'insertImage',
        'insertVideo'
      ]
    ]
  }

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private uploadImageService: UploadImageService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {
    this.id = this.activeRoute.snapshot.paramMap.get('id')
    this.addProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      sku: new FormControl(null, Validators.required),
      price: new FormControl(null, [
        Validators.required,
        Validators.max(100000)
      ]),
      quantity: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
      image: new FormControl(null),
      avatar: new FormControl(this.initAvatarImage, Validators.required),
    })
  }

  //----------lifecycle----------//
  ngOnInit(): void {
    //get api select category
    this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.listCategory = response.data
      },
      (error) => {
        this.toastr.error("Can't loading categories", 'Error')
      }
    )

    if (this.id) {
      this.title = "Edit product"
      this.spinner.show()
      this.productService.getProductDetails(this.id).subscribe(
        (response: any) => {
          this.spinner.hide()
          this.getName.setValue(response.data.name)
          this.getDescription.setValue(response.data.description)
          this.getCategory.setValue(response.data.category._id)
          this.getSku.setValue(response.data.sku)
          this.getPrice.setValue(response.data.price)
          this.getQuantity.setValue(response.data.quantity)
          this.galleries = response.data.galleries
          this.initAvatarImage = response.data.image
          this.getAvatar.setValue(response.data.image)
        },
        (error: any) => {
          this.spinner.hide()
          this.toastr.error("Can't loading product", 'Error')
        }
      )
    } 
  }

  //------------handle-----------//
  get getName(): AbstractControl {
    return this.addProductForm.get('name')!
  }

  get getDescription(): AbstractControl {
    return this.addProductForm.get('description')!
  }

  get getSku(): AbstractControl {
    return this.addProductForm.get('sku')!
  }

  get getPrice(): AbstractControl {
    return this.addProductForm.get('price')!
  }

  get getCategory(): AbstractControl {
    return this.addProductForm.get('category')!
  }

  get getQuantity(): AbstractControl {
    return this.addProductForm.get('quantity')!
  }

  get getImage(): AbstractControl {
    return this.addProductForm.get('image')!
  }

  get getAvatar(): AbstractControl {
    return this.addProductForm.get('avatar')!
  }

  handleUploadImage(event: any) {
    this.uploadImageLoading = true
    if (event.target.files && event.target.files[0]) {
      const categoryImage = event.target.files[0]
      this.uploadImageService.uploadImage(categoryImage).subscribe(
        (response: any) => {
          this.uploadImageLoading = false
          this.toastr.success('Upload photo successfully')
          this.galleries.push({
            label: `${this.galleries.length}`,
            url: response.data.secure_url,
            type: 'image'
          })
        },
        (error: any) => {
          this.uploadImageLoading = false
          this.toastr.error('Upload photo failed')
        }
      )
    }
  }

  handleDeleteImage(index: number) {
    let galleriesCopy = [...this.galleries]
    galleriesCopy.splice(index, 1)
    this.galleries = galleriesCopy
    this.getImage.setValue(null)
  }

  handleSubmit() {
    this.addProductForm.markAllAsTouched()
    if (!(this.addProductForm.valid && (this.galleries.length > 0))) return

    this.uploadProductLoading = true
    const product: ProductCreateModel = {
      name: this.getName.value,
      description: this.getDescription.value,
      sku: this.getSku.value,
      price: this.getPrice.value,
      quantity: this.getQuantity.value,
      image: this.getAvatar.value,
      category: this.getCategory.value,
      galleries: this.galleries
    }

    if (this.id) {
      this.productService.editProduct(product, this.id).subscribe(
        (response: any) => {
          this.uploadProductLoading = false
          this.toastr.success('Add product successfully', 'Success')
          this.router.navigate(['main', 'products'])
        },
        (error: any) => {
          this.uploadProductLoading = false
          this.toastr.error('Add product failed', 'Error')
        }
      )
    } else {
      this.productService.addProduct(product).subscribe(
        (response: any) => {
          this.uploadProductLoading = false
          this.toastr.success('Add product successfully', 'Success')
          this.router.navigate(['main', 'products'])
        },
        (error: any) => {
          this.uploadProductLoading = false
          this.toastr.error('Add product failed', 'Error')
        }
      )
    }
  }
}
