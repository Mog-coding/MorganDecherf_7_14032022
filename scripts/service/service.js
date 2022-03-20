import Recipe from "../model/Recipe.js";

export default class RecipeService {
    constructor() {
    }
    rechercheGlobale() {
        this.recipes.forEach(function (objet) {
            const nameLow = objet.name.toLowerCase();
            const descriptionLow = objet.description.toLowerCase();

            if (nameLow.includes(saisieLow)) {
                console.log("name trouvé");
                arrayFiltered.push(objet)
            }
            else if (descriptionLow.includes(saisieLow)) {
                console.log("description trouvée");
                arrayFiltered.push(objet)
            }
            else {
                objet.ingredients.forEach((obj) => {
                    // obj = {ingre: "kiwi", quantity:, unit:}
                    const ingredientLow = obj.ingredient.toLowerCase();
                    if (ingredientLow.includes(saisieLow)) {
                        console.log("ingrédient trouvé")
                        arrayFiltered.push(objet)
                    }
                })
            }
        })
    }

    async fetchData() {
        fetch("data/recipes.json") // Promise résolue: serveur répond
            .then((response) => {   // Promise résolue: data chargée  
                return response.json();
            })
            .then(({ recipes }) => { // Promise résolue: retourne data
                this.recipes = recipes.map(function (recipe) {
                    return new Recipe(recipe);
                });
            })
    }
}