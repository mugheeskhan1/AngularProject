import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test Recipe 1',
            'What Else you need?',
            'https://www.acouplecooks.com/wp-content/uploads/2021/04/Baked-Quesadilla-in-Oven-003.jpg',
            [
                new Ingredient('Meat', 23),
                new Ingredient('French Fries', 13),
            ]),
        new Recipe('A test Recipe 2',
            'What Else you need?',
            'https://www.acouplecooks.com/wp-content/uploads/2021/04/Baked-Quesadilla-in-Oven-003.jpg',
            [
                new Ingredient('Buns', 40),
                new Ingredient('Eggs', 10),
            ]),
    ];

    getRecipes() {
        //a copy of this array will be shared not orignal array
        return this.recipes.slice();
    }
}