import { Injectable } from '@angular/core';
import {Food, IFood} from "../shared/model/Food";
import {sample_tags} from "../../data";
import {Tag} from "../shared/model/tag";
import {HttpClient} from "@angular/common/http";
import { Observable, Subscription} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class FoodService {

 private foodStore: Food[] = []
  constructor(private httpClient: HttpClient) { }

  initFoods(): Observable<Food[]>{
    return  this.httpClient.get<Food[]>('http://localhost:3000/foods')
  }

  setFoods(data: Food[]) {//устанавливает то что пришло с сервера
   this.foodStore = data;
  }

  getAllTags(): Tag[] {//получаем массив с тегами
    return sample_tags;
  }

  getAllFoodByTag(tag: string): Food[] { // ищем те пиццы которые соответствуют этому тегу
    return  this.foodStore.filter(food => food.tags?.includes(tag));
    // tag === "All" ?
    //   this.foodStore :

  }

  //Делаем поиск - фильтруем по названию продукта + регист неважен
  getAllFoodBySearchTerm(searchTerm: string) {// ищем те пиццы которые соответствуют этому поиску
    return this.foodStore.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getFoodById(foodId:string):Food{
    return this.foodStore.find(food => food.id == foodId) ?? new Food();
  }



}
