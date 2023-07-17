import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {HomeComponent} from './components/pages/home/home.component';
import {SearchComponent} from './components/pages/search/search.component';
import {FoodPageComponent} from './components/pages/food-page/food-page.component';
import {CartPageComponent} from './components/pages/cart-page/cart-page.component';
import {TitleComponent} from './components/pages/title/title.component';
import {NotFoundComponent} from './components/pages/not-found/not-found.component';
import {TagsComponent} from './components/pages/tags/tags.component';
import {LoginComponent} from './components/pages/auth/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CheckboxModule} from "primeng/checkbox";
import {ButtonModule} from "primeng/button";
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RegistrationComponent } from './components/pages/auth/registration/registration.component';
import { PrivateAccountComponent } from './components/pages/auth/private-account/private-account.component';
import {MessageService} from "primeng/api";
import {MessagesModule} from "primeng/messages";
import {CommonModule} from "@angular/common";
import {ToastModule} from "primeng/toast";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {InterceptorService} from "./services/interceptor.service";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchComponent,
    FoodPageComponent,
    CartPageComponent,
    TitleComponent,
    NotFoundComponent,
    TagsComponent,
    LoginComponent,
    RegistrationComponent,
    PrivateAccountComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CheckboxModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
    ToastModule,
    BrowserAnimationsModule


  ],
  providers: [MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
