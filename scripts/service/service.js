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
                // Recipes ->  [{..}, {..},] 50 objets recette
                // Mise à jour propriété class -> 50 instance de class Recipe
                this.recipes = recipes.map((objRecipe) => {
                    const recipesInst = new Recipe(objRecipe);
                    return recipesInst;
                });
            })
    }

    // Extrait liste ingrédients du tableau recette complet ou filtré
    // Si recherche filtre -> filte ingrédients qui match avec saisie
    getIngredientsList(filteredRecipes, saisieIngredient) {

        // Transformation array d'objet recette -> array de liste d'ingrédients
        // map sur filteredRecipes si existe, sinon sur tableau recettes non modifié
        let listIngredients = (filteredRecipes || this.recipes).map((objRecette) => {
            return objRecette.ingredients.map((objIngredient) => {
                return objIngredient.ingredient.toLowerCase()
            });
        });
        // Array d'array liste -> array string liste, supprime 1 imbrication    
        listIngredients = listIngredients.flat();
        // Obj Set -> supprime doublons, spread [... set] conversion set -> array
        listIngredients = [... new Set(listIngredients)];

        // Filtre l'array de string ingrédients en fct saisie
        if (saisieIngredient) {
            listIngredients = listIngredients.filter((el) => {
                return el.indexOf(saisieIngredient.toLowerCase()) > -1
            });
        }

        // Formatage liste
        // Ajoute une maj sur 1er caractère
        listIngredients = listIngredients.map((el) => {
            return el[0].toUpperCase() + el.slice(1);
        })
        // Retourne liste classée dans l'ordre alphabétique
        return listIngredients.sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
        })
    }
}