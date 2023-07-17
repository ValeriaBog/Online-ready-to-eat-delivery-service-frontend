import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {FoodPageComponent} from "./components/pages/food-page/food-page.component";
import {CartPageComponent} from "./components/pages/cart-page/cart-page.component";
import {LoginComponent} from "./components/pages/auth/login/login.component";
import {RegistrationComponent} from "./components/pages/auth/registration/registration.component";
import {PrivateAccountComponent} from "./components/pages/auth/private-account/private-account.component";

const routes: Routes = [{
  path: '', component: HomeComponent
},
  {
  path: 'search/:searchTerm', component: HomeComponent
},
  {
  path: 'tag/:tag', component: HomeComponent
},
  {
  path: 'food/:id', component: FoodPageComponent
},
  {
  path: 'cart-page', component: CartPageComponent
},
  {
  path: 'login', component: LoginComponent
},
  {
  path: 'registr', component: RegistrationComponent
},
  {
    path: 'account', component: PrivateAccountComponent
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
