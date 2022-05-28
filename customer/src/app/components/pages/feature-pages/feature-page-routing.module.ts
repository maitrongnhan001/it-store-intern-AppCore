import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAddressComponent } from '../../partials/add-address/add-address.component';
import { AddOrderComponent } from '../../partials/add-order/add-order.component';
import { AddressesComponent } from '../../partials/addresses/addresses.component';
import { CartComponent } from '../../partials/cart/cart.component';
import { IndexComponent } from '../../partials/index/index.component';
import { OrderDetailsComponent } from '../../partials/order-details/order-details.component';
import { OrderHistoryComponent } from '../../partials/order-history/order-history.component';
import { ProductDetailsComponent } from '../../partials/product-details/product-details.component';
import { ProductsComponent } from '../../partials/products/products.component';
import { ProfileComponent } from '../../partials/profile/profile.component';
import { AuthGuardService as authGuard } from '../../../services/auth-guard.service';


const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'products', component: ProductsComponent},
    {path: 'products/:categoryId', component: ProductsComponent},
    {path: 'product-details/:id', component: ProductDetailsComponent},
    {
      path: 'cart', 
      canActivate: [authGuard],
      component: CartComponent
    },
    {
      path: 'order-history',
      canActivate: [authGuard],
      component: OrderHistoryComponent
    },
    {
      path: 'order-history-details/:id', 
      canActivate: [authGuard],
      component: OrderDetailsComponent
    },
    {
      path: 'order', 
      canActivate: [authGuard],
      component: AddOrderComponent
    },
    {
      path: 'profile', 
      canActivate: [authGuard],
      component: ProfileComponent
    },
    {
      path: 'address', 
      canActivate: [authGuard],
      component: AddressesComponent
    },
    {
      path: 'add-address', 
      canActivate: [authGuard],
      component: AddAddressComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppFeaturePagesRoutingModule { }
