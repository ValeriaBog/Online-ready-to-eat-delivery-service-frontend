import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../services/food.service";
import {Food} from "../../../shared/model/Food";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   foods: Food[] = [];


  constructor(private api: FoodService, private activateRoute: ActivatedRoute) { //Маршруты могут определять параметры, через которые мы можем передавать компоненту какие-то данные извне.ActivatedRoute
    activateRoute.params.subscribe(params => {
      console.log('params', params)
      if(params.searchTerm){
        this.foods = this.api.getAllFoodBySearchTerm(params.searchTerm) // ищем пиццы по названию в поиске
      }else if (params.tag){
        this.foods = this.api.getAllFoodByTag(params.tag) //ищем пиццы по тегу
      }
    })
  }

  ngOnInit() {
    console.log('ttt')
    this.api.initFoods().subscribe((data) => {
      console.log('***')
      this.api.setFoods(data);
      const foods = data;
      //получение параметров маршрута - activateRoute. Он содержит информацию о маршруте, в частности, параметры маршрута,
      // параметры строки запроса и прочее
      // Свойство snapshot хранит состояние маршрута, а состояние маршрута содержит переданные параметры.
      //параметр будет называться "searchTerm"
      const isSearch =this.activateRoute.snapshot.paramMap.get('searchTerm');
      const isTag = this.activateRoute.snapshot.paramMap.get('tag');
      if (isTag) {
        this.foods = this.api.getAllFoodByTag(isTag)
      } else if (isSearch) {
        this.foods = this.api.getAllFoodBySearchTerm(isSearch)
      } else {
        this.foods = foods;
      }


      console.log('isTag', isTag)


    })

  }

}
