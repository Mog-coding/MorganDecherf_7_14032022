export default class Recipe {
    constructor(objetRecipe) {    
        this.appliance = objetRecipe.appliance;
        this.description = objetRecipe.description;
        this.id = objetRecipe.id;
        // Formatage de la propriété quantity écrite "quantity" ou "quantite"
        this.ingredients = objetRecipe.ingredients.map(function(el){
            return {
                ingredient : el.ingredient,
                quantity : el.quantity || el.quantite,
                unit : el.unit
            }
        });
        this.name = objetRecipe.name;
        this.servings = objetRecipe.servings;
        this.time = objetRecipe.time;
        this.ustensils = objetRecipe.ustensils;
    }
}