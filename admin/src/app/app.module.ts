import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FeaturePagesComponent } from './components/pages/feature-pages/feature-pages.component';
import { CategoriesComponent } from './components/partials/categories/categories.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { ProductsComponent } from './components/partials/products/products.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { MenuComponent } from './components/partials/menu/menu.component';
import { FooterComponent } from './components/partials/footer/footer.component';
import { AddCategoryComponent } from './components/partials/add-category/add-category.component';
import { AddProductComponent } from './components/partials/add-product/add-product.component';
import { ProductDetailsComponent } from './components/partials/product-details/product-details.component';
import { OrdersComponent } from './components/partials/orders/orders.component';
import { OrderDetailsComponent } from './components/partials/order-details/order-details.component';
import { ProfileComponent } from './components/partials/profile/profile.component';
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
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';




@NgModule({
  declarations: [
    AppComponent,
    FeaturePagesComponent,
    CategoriesComponent,
    LoginPageComponent,
    ProductsComponent,
    NotFoundPageComponent,
    MenuComponent,
    FooterComponent,
    AddCategoryComponent,
    AddProductComponent,
    ProductDetailsComponent,
    OrdersComponent,
    OrderDetailsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return '';
        }
      }
    })
  ],
  providers: [JwtHelperService],
  bootstrap: [AppComponent]
})
export class AppModule { }
