import {Component, OnInit} from '@angular/core';
import {CartService} from "../../services/cart.service";
import {Router} from "@angular/router";
import {LoginService} from "../../services/login.service";
import {Registr} from "../../shared/model/Registration";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {

  cartQuantity=0;
  user!: Registr|null;
  constructor(cartService:CartService, private router: Router, private loginService: LoginService) {
    cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCounter;
    })
  }

  ngOnInit(): void {
   }


  // реализовать, когда подключу сервер к монго
  routes() { // сделать переходы  с помощью navigate

    this.user = this.loginService.getUser();
    if (this.user!=null) { // если такой пользователь есть, он записывается в this.user, значит переход на другую старницу
      this.router.navigate(['account'])

    } else {// если нет такого пользователя, то остаемся на этой же странице
      this.router.navigate(['registr'])
    }
   }
}
