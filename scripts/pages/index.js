/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

// Saisie champ recherche -> trie et affichage recette
let saisie = "";
document.querySelector("#inputSearch").addEventListener("input", () => {
   const nodeSectionRecette = document.querySelector(".sectionRecettes")
   // Gestion de la saisie 
   saisie = document.querySelector("#inputSearch").value;

   // Effacement recettes affichées précédemment si il y en a
   while (nodeSectionRecette.firstChild) {
      nodeSectionRecette.removeChild(nodeSectionRecette.firstChild)
   };

   
   const testService = new RecipeService();
   // result = tableau 50 instance class Recipe
   testService.fetchData().then(function (result) {
      // Trie des instance Recipe
      console.log(testService.rechercheGlobale(result, saisie));
      // Creation du html des Recipe triées
      testService.rechercheGlobale(result, saisie).forEach(function (instRecipe) {
         const recipeFactory = new RecipeFactory(instRecipe);
         nodeSectionRecette.appendChild(recipeFactory.createRecipeCards())
      })
   })



})