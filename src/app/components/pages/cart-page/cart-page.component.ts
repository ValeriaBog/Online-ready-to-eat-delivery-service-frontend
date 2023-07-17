import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../services/cart.service";
import {Cart} from "../../../shared/model/Cart";
import {CartItem} from "../../../shared/model/CartItem";
import {MessageService} from "primeng/api";



@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cart!: Cart

  constructor(private cartService: CartService,
              private messageService: MessageService) {

    this.cartService.getCartObservable().subscribe(cart => {
      //когда подписываемся, возвращается последнее значение, которое сидит в свойстве Cart в cartService
      this.cart = cart
      //если добавили в корзину товар, то свойство cart будет с данными о товаре.
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id)
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString)// в число
    this.cartService.changeQuantity(cartItem.food.id, quantity)
  }

  order() {
    const user = localStorage.getItem('user')
    const userInfo = localStorage.getItem('userInfo')
    if (user && userInfo) {
      const userParse = JSON.parse(user)
      const userInfoParse = JSON.parse(userInfo)
      this.cartService.addOrder(userParse, userInfoParse).subscribe(data => {
        this.messageService.add({severity: 'success', summary: 'Заказ оформлен!', detail:'Вам перезвонят в ближайшее время для подтверждения заказа.'});
      })
    } else if(!user){
      this.messageService.add({severity: 'error', summary: "Войдите в личный кабинет"});
    } else if(!userInfo) {
      this.messageService.add({severity: 'error', summary: "Укажите номер телефона и адрес доставки в личном кабинете"});
    }
  }



}
