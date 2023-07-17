import {Food} from "./Food";

export class CartItem{
  constructor(public food: Food) {
  }

  quantity: number = 1; // количество
  price: number = this.food.price;

}
