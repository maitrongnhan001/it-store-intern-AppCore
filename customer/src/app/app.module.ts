import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { FeaturePagesComponent } from './components/pages/feature-pages/feature-pages.component';
import { MenuComponent } from './components/partials/menu/menu.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { IndexComponent } from './components/partials/index/index.component';
import { ProductsComponent } from './components/partials/products/products.component';
import { AddAddressComponent } from './components/partials/add-address/add-address.component';
import { AddOrderComponent } from './components/partials/add-order/add-order.component';
import { AddressesComponent } from './components/partials/addresses/addresses.component';
import { CategoriesComponent } from './components/partials/categories/categories.component';
import { OrderDetailsComponent } from './components/partials/order-details/order-details.component';
import { OrderHistoryComponent } from './components/partials/order-history/order-history.component';
import { ProductDetailsComponent } from './components/partials/product-details/product-details.component';
import { ProfileComponent } from './components/partials/profile/profile.component';
import { CartComponent } from './components/partials/cart/cart.component';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { CategoryItemComponent } from './components/partials/categories/category-item/category-item.component';
import { ProductItemComponent } from './components/partials/products/product-item/product-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    FeaturePagesComponent,
    MenuComponent,
    FooterComponent,
    IndexComponent,
    ProductsComponent,
    AddAddressComponent,
    AddOrderComponent,
    AddressesComponent,
    CategoriesComponent,
    OrderDetailsComponent,
    OrderHistoryComponent,
    ProductDetailsComponent,
    ProfileComponent,
    CartComponent,
    NotFoundPageComponent,
    CategoryItemComponent,
    ProductItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
