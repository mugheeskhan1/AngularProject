import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test Recipe 1', 'Test 1', 'https://www.acouplecooks.com/wp-content/uploads/2021/04/Baked-Quesadilla-in-Oven-003.jpg'),
        new Recipe('A test Recipe 2', 'Test 2', 'https://www.acouplecooks.com/wp-content/uploads/2021/04/Baked-Quesadilla-in-Oven-003.jpg'),
    ];

    getRecipes() {
        //a copy of this array will be shared not orignal array
        return this.recipes.slice();
    }
}