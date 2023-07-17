import {Injectable} from '@angular/core';
import {Cart} from "../shared/model/Cart";
import {BehaviorSubject, Observable} from "rxjs";
import {Food} from "../shared/model/Food";
import {CartItem} from "../shared/model/CartItem";
import {HttpClient} from "@angular/common/http";
import {Registr} from "../shared/model/Registration";
import {IuserInfo} from "../shared/model/userInfo";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartFromLocalStorage() //здесь либо объект из Локал сторедж либо новый созданный объект
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
//возвращается последнее записанное значение свойства cart, необходимо начальное знаяение - this.cart

  constructor(private httpClient: HttpClient) {
  }

  //добавить в корзину
  addToCart(food: Food): void {
    let cartItem = this.cart.items.find(item => item.food.id === food.id)
    if (cartItem) {
      return;
    }
    this.cart.items.push(new CartItem(food))
    this.setCartToLocalStorage()//записываем в локалстрж с подсчетом тотал цены и количества товаров
  }

  //удалить из корзины item
  removeFromCart(foodId: string): void {
    this.cart.items = this.cart.items.filter(item => item.food.id !== foodId)
    this.setCartToLocalStorage()
  }

  //изменить количество item
  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find(item => item.food.id === foodId)
    if (!cartItem) {
      return;
    }

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price
    this.setCartToLocalStorage()
  }

// очистить корзину
  clearCart() {
    this.cart = new Cart()
    this.setCartToLocalStorage()
  }

  //get cart Observable mean check Observable data
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable()//превращает в Observable
  }

// localStorage

  private setCartToLocalStorage(): void {//изначально в локалсторадж есть объект Cart с пустым item и с нулевыми price и количеством
    this.cart.totalPrice = this.cart.items//считаем с помощью редьюсеров
      .reduce((prevSum, currentItem) => prevSum + currentItem.price, 0);
    this.cart.totalCounter = this.cart.items
      .reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);//записываем в локалсторадж
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage(): Cart {// получаем из локалсторадж
    const cartJson = localStorage.getItem('Cart')
    return cartJson ? JSON.parse(cartJson) : new Cart()//если есть, то парсим, если нет , то содаем новый объект
  }

  addOrder(user: Registr, userInfo: IuserInfo): Observable<any> {

    const order={
      totalPrice: this.cart.totalPrice, //итоговая цена
      totalCounter: this.cart.totalCounter,// итоговое количество позиций
      products: this.cart.items.map(item=>item.food.name),// массив с наименованиями пицц
      nameUser: user.name,
      lastNameUser: user.lastName,
      email: user.email,
      address: userInfo.address,
      userPhone: userInfo.userPhone
    }
    return this.httpClient.post('http://localhost:3000/order/', order)
  }


}
