import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {  ingredients: Ingredient[];
  private subscription: Subscription;
  show = false;

  constructor(
    private slService: ShoppingListService, 
    private router:Router, 
    private dataService: DataStorageService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  async submitOrder(data){
    let now = new Date();
    let obj = {...data, ingredients: this.ingredients, date: now.toDateString(), isArchived: false};
    this.show = true;
    this.dataService.storeOrder(obj);
    await new Promise(r => setTimeout(r, 3000));
    this.router.navigateByUrl('/recipes');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
