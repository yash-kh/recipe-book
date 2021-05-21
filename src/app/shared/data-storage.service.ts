import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { __param } from 'tslib';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-book-data-base-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://ng-recipe-book-data-base-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  getCount(call) {
    this.http
      .get(
        'https://ng-recipe-book-data-base-default-rtdb.firebaseio.com/ordersCount.json')
      .subscribe(response => {
        call(response);
      });
  }

  storeOrder(order) {
    this.getCount((id) => {
      this.http
        .put(
          'https://ng-recipe-book-data-base-default-rtdb.firebaseio.com/orders/' + id + '.json',
          order
        )
        .subscribe(response => {
          console.log(response);
          this.http.put('https://ng-recipe-book-data-base-default-rtdb.firebaseio.com/ordersCount.json', id+1)
          .subscribe(res=>{console.log(res)});
        });
    })
  }

  updateOrder(order, id){
    this.http.put('https://ng-recipe-book-data-base-default-rtdb.firebaseio.com/orders/' + id + '.json', order)
    .subscribe(res=>console.log(res));
  }

  getOrders(data) {
    this.http
      .get('https://ng-recipe-book-data-base-default-rtdb.firebaseio.com/orders.json')
      .subscribe(response => {
        data(response);
      });
  }
}
