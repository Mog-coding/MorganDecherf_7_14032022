/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

/* Récupère tableau recipe via fetch, filtre le tableau en fonction saisie du champ de recherche recette et affiche les cartes recettes */
async function init() {
   const nodeSectionRecette = document.querySelector(".sectionRecettes");
   const nodeSearch = document.querySelector("#inputSearch");
   const recipeService = new RecipeService();

   /* Methode fetchData: récupération data + ajout propriété recipeService: array 50 instances recette */
   recipeService.fetchData().then(function () {
      console.log(recipeService);
      // EventListener sur <input> champ de recherche recette
      nodeSearch.addEventListener("input", function (event) {
         console.log(event.target.value);
         /* Méthode rechercheGlobale filtre tableau instance recette en fonction saisie input */
         const filteredRecipes = recipeService.rechercheGlobale(event.target.value);

         // Supression des recettes préexistantes à la nouvelle saisie
         while (nodeSectionRecette.firstChild) {
            nodeSectionRecette.removeChild(nodeSectionRecette.firstChild)
         }
         // Affichage du html des nouvelles recettes
         filteredRecipes.forEach(function (instRecipe) {
            const recipeFactory = new RecipeFactory(instRecipe);
            nodeSectionRecette.appendChild(recipeFactory.createRecipeCards());
         })
      })
   }
   )
}
init();