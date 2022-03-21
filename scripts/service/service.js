import Recipe from "../model/Recipe.js";

export default class RecipeService {
    constructor() {
        this.recipes = [];
    }
    rechercheGlobale(arrayRecipe, saisie) {
        const saisieLow = saisie.toLowerCase();
        const arrayFiltered = [];
        arrayRecipe.forEach(function (instRecipe) {
            const nameLow = instRecipe.name.toLowerCase();
            const descriptionLow = instRecipe.description.toLowerCase();

            if (nameLow.includes(saisieLow)) {
                arrayFiltered.push(instRecipe)
            }
            else if (descriptionLow.includes(saisieLow)) {
                arrayFiltered.push(instRecipe)
            }
            else {
                instRecipe.ingredients.forEach((ingredients) => {
                    // ingredients = {ingre: "kiwi", quantity:, unit:}
                    const ingredientLow = ingredients.ingredient.toLowerCase();
                    if (ingredientLow.includes(saisieLow)) {
                        arrayFiltered.push(instRecipe)
                    }
                })
            }
        })
        return arrayFiltered
    }

    /* Récupération des données avec fetch */
    async fetchData() {
        return fetch("data/recipes.json")  // Promise résolue: serveur répond
            .then((response) => {        // Promise résolue: data chargée  
                return response.json();
            })
            .then(({ recipes }) => {      // Promise résolue: retourne data
                // console.log(recipes);  [{..}, {..},] 50 instRecipes

                // Retourne tableau d'instances recettes de class Recipe
                const thisrecipe = recipes.map(function (objRecipe) {
                    const recipesInst = new Recipe(objRecipe);
                    return recipesInst;
                });
                return thisrecipe  // remplacer thisrecipe par this.recipes
            })
    }
}