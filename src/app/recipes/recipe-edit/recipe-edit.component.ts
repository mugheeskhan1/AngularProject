import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    imagePath: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    ingredients: new FormArray([]),
  });

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    const fa = this.getFormArray();

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);

      this.recipeForm.get('name')?.setValue(recipe.name);
      this.recipeForm.get('imagePath')?.setValue(recipe.imagePath);
      this.recipeForm.get('description')?.setValue(recipe.description);

      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          fa.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }
  }

  //Add ingredient with dafault value set to null and validations
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  public getFormArray(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  onSubmit() {
    // Method 1:
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    // if (this.editMode) {
    //   this.recipeService.updateRecipe(this.id, newRecipe);
    // } else {
    //   this.recipeService.addRecipe(newRecipe);
    // }

    // Method 2
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
  }
}
