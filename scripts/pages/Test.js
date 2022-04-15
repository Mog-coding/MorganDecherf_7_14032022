import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

export default class HomePageControler {

    filteredRecipes = [];
    originalRecipes = [];

    inputSearch = "";

    selectedTags = {
        ingredientList: [],
        appareilList: [],
        ustensilList: []
    };

    recipeService = new RecipeService();
    
    inputIngredient = document.querySelector("#searchIngredient");

    constructor() {
        this.init()
    }

    async init() {
        /* récupération data + ajout propriété recipeService: array 50 instances recette */
        await this.recipeService.fetchData();

        // Initialisation tableau recettes filtrées
        this.filteredRecipes = [...this.recipeService.recipes];
        this.originalRecipes = [...this.recipeService.recipes];

        // Initialisation affichage des recettes
        recipesDisplay(recipeService.filterByArrayTag());
    }
}
new HomePageControler();