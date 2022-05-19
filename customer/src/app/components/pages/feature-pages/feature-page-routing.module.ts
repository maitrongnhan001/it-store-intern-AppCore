import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddOrderComponent } from '../../partials/add-order/add-order.component';
import { AddressesComponent } from '../../partials/addresses/addresses.component';
import { CartComponent } from '../../partials/cart/cart.component';
import { IndexComponent } from '../../partials/index/index.component';
import { OrderDetailsComponent } from '../../partials/order-details/order-details.component';
import { OrderHistoryComponent } from '../../partials/order-history/order-history.component';
import { ProductDetailsComponent } from '../../partials/product-details/product-details.component';
import { ProductsComponent } from '../../partials/products/products.component';
import { ProfileComponent } from '../../partials/profile/profile.component';


const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'product-details', component: ProductDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'order-history', component: OrderHistoryComponent},
    {path: 'order-history-details', component: OrderDetailsComponent},
    {path: 'order', component: AddOrderComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'address', component: AddressesComponent},
    {path: 'add-address', component: AddressesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFeaturePagesRoutingModule { }
