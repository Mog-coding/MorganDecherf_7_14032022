/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

let filteredRecipes = [];

/* Récupère tableau recipe via fetch */
async function init() {

   let nodeSectionRecette = document.querySelector(".sectionRecettes");
   const nodeSearch = document.querySelector("#globalSearch");
   const recipeService = new RecipeService();


   /************
   *************    FETCH     *******************
   *************/

   /* récupération data + ajout propriété recipeService: array 50 instances recette */
   await recipeService.fetchData();


   /************
   *************    FILTRES     *******************
   *************/

   const inputIngredient = document.querySelector("#searchIngredient");

   /* Initialisation liste ingrédients dans filtre */
   createIngredientList(recipeService.getIngredientsList(null));
   createTags();

   /* Listener champ recherche filtre */
   inputIngredient.addEventListener("change", (event) => {
      const saisie = event.target.value;
      createIngredientList(recipeService.getIngredientsList(null, saisie));
      createTags();
   })

   /* Listener sur liste ingrédients */


   /************* Menu Dropdown *************/
   const ingredientFilter = document.querySelector("#ingredientFilter");
   const nodeIconFilter = document.querySelector(".filter img");
   const ingredientUl = document.querySelector("#ingredientList");

   // Click sur menu dropDown -> ouvre / ferme
   inputIngredient.addEventListener("click", (event) => {
      if (!ingredientUl.classList.contains("appear")) {
         openDropDown();
      } else {
         closeDropDown();
      }
   })

   // Fermer/ouvrir menu dropdown:
   function openDropDown() {
      /* Modification <input type="text" -> "search" */
      ingredientUl.classList.add("appear");
      ingredientFilter.classList.add("unsetFilter");
      inputIngredient.setAttribute("type", "search");
      inputIngredient.setAttribute("type", "search");
      inputIngredient.removeAttribute("value");
      inputIngredient.setAttribute("placeholder", "Rechercher un ingredient");
      nodeIconFilter.classList.add("rotate");
   }
   function closeDropDown() {
      ingredientUl.classList.remove("appear");
      ingredientFilter.classList.remove("unsetFilter")
      inputIngredient.setAttribute("type", "button");
      inputIngredient.removeAttribute("placeholder");
      inputIngredient.setAttribute("value", "ingredient");
      nodeIconFilter.classList.remove("rotate");
   }

   /************
   *************    TAG     *******************
   *************/

   function createTags() {
      // Ajout Listener sur chaque ingrédient de la liste
      const nodeTag = document.querySelector(".sectionTags");
      const nodesList = document.querySelectorAll(".itemIngredient");
      nodesList.forEach((el) => {
         el.addEventListener("click", function () {
            closeDropDown();
            const tag = document.createElement("button");
            tag.innerHTML = `${el.textContent}
            <img src="assets/icons/croix.svg" alt="" />`;
            tag.classList.add("btnTag");
            if(el.classList.contains("itemIngredient")){
               tag.classList.add("colorIngredient");
            }
            nodeTag.appendChild(tag);
         })
      })
   }

   /************
   *************    Recherche globale     *******************
   *************/

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







}
init();




function createIngredientList(ingredientsList) {
   const ingredientUl = document.querySelector("#ingredientList");
   // Supression des listes existantes
   ingredientUl.innerHTML = null;
   // Ajout des nouvelles listes
   ingredientsList.forEach((el) => {
      const list = document.createElement("li");
      list.classList.add("itemIngredient")
      list.innerHTML = el;
      ingredientUl.appendChild(list);
   })
}














