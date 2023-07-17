import {Component, OnInit} from '@angular/core';
import {FoodService} from "../../../services/food.service";
import {Tag} from "../../../shared/model/tag";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent{
  tags?:Tag[]; //просто отрисовать теги в шаблоне
  constructor(api:FoodService) {
    this.tags = api.getAllTags();
  }




}
