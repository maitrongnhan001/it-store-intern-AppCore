import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppFeaturePagesRoutingModule } from './components/pages/feature-pages/feature-pages-routing.module';
import { FeaturePagesComponent } from './components/pages/feature-pages/feature-pages.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { NotFoundPageComponent } from './components/pages/not-found-page/not-found-page.component';
import { AuthGuardService as authGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'main',
    component: FeaturePagesComponent,
    canActivate: [authGuard],
    loadChildren: () => AppFeaturePagesRoutingModule
  },
  {path: 'login', component: LoginPageComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
