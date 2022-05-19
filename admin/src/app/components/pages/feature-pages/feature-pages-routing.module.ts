import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from '../../partials/add-category/add-category.component';
import { AddProductComponent } from '../../partials/add-product/add-product.component';
import { CategoriesComponent } from '../../partials/categories/categories.component';
import { OrderDetailsComponent } from '../../partials/order-details/order-details.component';
import { OrdersComponent } from '../../partials/orders/orders.component';
import { ProductDetailsComponent } from '../../partials/product-details/product-details.component';
import { ProductsComponent } from '../../partials/products/products.component';
import { ProfileComponent } from '../../partials/profile/profile.component';



const routes: Routes = [
    {path: 'categories', component: CategoriesComponent},
    {path: 'add-category', component: AddCategoryComponent},
    {path: 'edit-category/:id', component: AddCategoryComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent},
    {path: 'add-product', component: AddProductComponent},
    {path: 'edit-product/:id', component: AddProductComponent},
    {path: 'orders', component: OrdersComponent},
    {path: 'order-details/:id', component: OrderDetailsComponent},
    {path: 'profile', component: ProfileComponent},
    {path: '', redirectTo: 'categories', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFeaturePagesRoutingModule { }
