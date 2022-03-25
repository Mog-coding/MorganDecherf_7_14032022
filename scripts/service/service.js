import Recipe from "../model/Recipe.js";

export default class RecipeService {
    constructor() {
        this.recipes = [];
    }
    rechercheGlobale(saisie) {
        const saisieLow = saisie.toLowerCase();
        const arrayRecipeFiltered = [];
        this.recipes.forEach((instRecipe) => {
            const nameLow = instRecipe.name.toLowerCase();
            const descriptionLow = instRecipe.description.toLowerCase();

            if (nameLow.includes(saisieLow)) {
                arrayRecipeFiltered.push(instRecipe)
            }
            else if (descriptionLow.includes(saisieLow)) {
                arrayRecipeFiltered.push(instRecipe)
            }
            else {
                instRecipe.ingredients.forEach((ingredients) => {
                    // ingredients = {ingre: "kiwi", quantity:, unit:}
                    const ingredientLow = ingredients.ingredient.toLowerCase();
                    if (ingredientLow.includes(saisieLow)) {
                        arrayRecipeFiltered.push(instRecipe)
                    }
                })
            }
        })
        return arrayRecipeFiltered
    }

    /* Récupération data fetch: tableau recette -> tableau instance recette  */
    async fetchData() {
        return fetch("data/recipes.json")  // Promise résolue: serveur répond
            .then((response) => {        // Promise résolue: data chargée  
                return response.json();
            })
            .then(({ recipes }) => {      // Promise résolue: retourne data
                // recipes ->  [{..}, {..},] 50 objets recette
                // Mise à jour propriété class -> 50 instance de class Recipe
                this.recipes = recipes.map((objRecipe) => {
                    const recipesInst = new Recipe(objRecipe);
                    return recipesInst;
                });
            })
    }

    ingredientSearch(saisie){
    const finder = this.recipes.filter((objRecette)=> {
        let foundRecette = false;
        // tableau ingredients       objet ingredient(contient)
        objRecette.ingredients.forEach((objIngredient) => {
            if (objIngredient.ingredient.includes(saisie)) {
                foundRecette = true;
            } 
        })
        return foundRecette;
    });
    console.log(finder);
    return finder
    }





}