/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

/* Récupère tableau recipe via fetch, filtre le tableau en fonction saisie du champ de recherche recette et affiche les cartes recettes */
async function init() {
   const nodeSectionRecette = document.querySelector(".sectionRecettes");
   const nodeSearch = document.querySelector("#globalSearch");
   const recipeService = new RecipeService();

   /* Methode fetchData: récupération data + ajout propriété recipeService: array 50 instances recette */
   recipeService.fetchData().then(() => {
      console.log(recipeService);

      // EventListener sur <input> champ de recherche recette
      nodeSearch.addEventListener("input", (event) => {

         /* Méthode rechercheGlobale filtre tableau instance recette en fonction saisie input */
         const filteredRecipes = recipeService.rechercheGlobale(event.target.value);
         console.log(filteredRecipes);

         // Supression des recettes préexistantes à la nouvelle saisie
         while (nodeSectionRecette.firstChild) {
            nodeSectionRecette.removeChild(nodeSectionRecette.firstChild)
         }
         // Affichage du html des nouvelles recettes
         filteredRecipes.forEach((instRecipe) => {
            const recipeFactory = new RecipeFactory(instRecipe);
            nodeSectionRecette.appendChild(recipeFactory.createRecipeCards());
         })
      })

      // Dropdown bouton ustensile
      const nodeFilter = document.querySelector(".filter");
      const contFilterOpen = document.querySelector(".contFilterOpen");
      const nodeNameFilter = document.querySelector(".filter span");
      const nodeSearchFilter = document.querySelector("#filterSearch");
      const nodeIconFilter = document.querySelector(".filter img");

      nodeFilter.addEventListener("click", () => {
         if (!contFilterOpen.classList.contains("appear")) {
            contFilterOpen.classList.add("appear");
            nodeNameFilter.classList.add("disappear");
            nodeFilter.classList.add("unsetFilter");
            nodeIconFilter.classList.add("rotate");
            nodeSearchFilter.focus();

         }else {
            contFilterOpen.classList.remove("appear");
            nodeFilter.classList.remove("unsetFilter");
            nodeNameFilter.classList.remove("disappear")
            nodeIconFilter.classList.remove("rotate");
         }
      })

      // Recherche filtres
      nodeSearchFilter.addEventListener("input", (event) => {
        const filteredIngredient = recipeService.ingredientSearch(event.target.value);
        console.log(filteredIngredient);
        
        

      })
   








      

   })


}
init();