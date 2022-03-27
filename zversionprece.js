/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

let filteredRecipes = [];

/* Récupère tableau recipe via fetch */
async function init() {
   let nodeSectionRecette = document.querySelector(".sectionRecettes");
   const nodeSearch = document.querySelector("#globalSearch");
   const recipeService = new RecipeService();

   /* Methode fetchData: récupération data + ajout propriété recipeService: array 50 instances recette */
   await recipeService.fetchData();
   

   /* Ajout liste ingrédients dans filtre */
   setIngredientList(recipeService.getIngredients());


   // EventListener sur <input> champ de recherche recette
   nodeSearch.addEventListener("input", (event) => {

      /* Méthode rechercheGlobale filtre tableau instance recette en fonction saisie input */
      filteredRecipes = recipeService.rechercheGlobale(event.target.value);
      // Supression des recettes préexistantes à la nouvelle saisie
      nodeSectionRecette.innerHTML = null;
   
      // Affichage du html des nouvelles recettes
      filteredRecipes.forEach((instRecipe) => {
         const recipeFactory = new RecipeFactory(instRecipe);
         nodeSectionRecette.appendChild(recipeFactory.createRecipeCards());
      })
   })

   // Dropdown bouton ustensile
   const ingredientFilter = document.querySelector("#ingredientFilter");
   const inputIngredient = document.querySelector("#searchIngredient");
   const nodeIconFilter = document.querySelector(".filter img");
   const ingredientList = document.querySelector("#ingredientList");

   inputIngredient.addEventListener("click", (event) => {
      if (!ingredientList.classList.contains("appear")) {
         /* Modification <input type="text" -> "search" */
         ingredientList.classList.add("appear");
         ingredientFilter.classList.add("unsetFilter");
         event.target.setAttribute("type", "search");
         event.target.setAttribute("type", "search");
         event.target.removeAttribute("value");
         event.target.setAttribute("placeholder", "Rechercher un ingredient");
         nodeIconFilter.classList.add("rotate");

      } else {
         ingredientList.classList.remove("appear");
         ingredientFilter.classList.remove("unsetFilter")
         event.target.setAttribute("type", "button");
         event.target.removeAttribute("placeholder");
         event.target.setAttribute("value", "ingredient");
         nodeIconFilter.classList.remove("rotate");
      }
   })

   searchIngredient.addEventListener("change",(event) => {
      const value = event.target.value;
      setIngredientList(recipeService.getIngredients(null, value));
   })









   /*
   nodeSearchIngredient.addEventListener("input", (event) => {
      const filteredIngredient = recipeService.ingredientSearch(event.target.value);
   })
   */
}
init();


function setIngredientList(ingredients){
   const ingredientList = document.querySelector("#ingredientList");
   ingredientList.innerHTML = null;
   ingredients.forEach(ingredient => {
      const li = document.createElement("li");
      li.innerText = ingredient;
      ingredientList.appendChild(li);
   })
}