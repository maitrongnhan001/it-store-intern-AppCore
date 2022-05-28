import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppFeaturePagesRoutingModule } from './components/pages/feature-pages/feature-page-routing.module';
import { FeaturePagesComponent } from './components/pages/feature-pages/feature-pages.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';



const routes: Routes = [
  {
    path: 'main', 
    component: FeaturePagesComponent,
    loadChildren: () => AppFeaturePagesRoutingModule
  },
  {path: 'login', component: LoginPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
