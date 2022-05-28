import { Component, Input, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.scss']
})
export class CategoryItemComponent implements OnInit {
  @Input() category!: CategoryModel
  constructor() { }

  ngOnInit(): void {
  }

}
