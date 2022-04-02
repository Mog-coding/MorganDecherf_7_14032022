/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

let filteredRecipes = [];
let selectedTags = {
   ingredientList: [],
   appareilList: []
};

/* Récupère tableau recipe via fetch */
async function init() {

   let nodeSectionRecette = document.querySelector(".sectionRecettes");
   const nodeSearch = document.querySelector("#globalSearch");
   const recipeService = new RecipeService();


   /************
   *************     FETCH     *******************
   *************/

   /* récupération data + ajout propriété recipeService: array 50 instances recette */
   await recipeService.fetchData();
   // Initialisation tableau recettes filtrées
   filteredRecipes = [...recipeService.recipes];


   /************
   *************     FILTRES     *******************
   *************/

   const inputIngredient = document.querySelector("#searchIngredient");


   /*** Click sur menu dropDown -> ouvre / ferme ***/
   const boutonFilter = document.querySelectorAll(".openDropdown");

   // Listener sur les 3 filtres: 1er clic: ouvre dropDown, 2eme clic: ferme 
   boutonFilter.forEach((el) => {
      el.addEventListener("click", (event) => {
         if (!event.target.nextElementSibling.classList.contains("appear")) {
            if (event.target.id === "searchIngredient") {
               createFilterList("#ingredientList", recipeService.getIngredientsList(filteredRecipes));
            }
            else if (event.target.id === "searchAppareil") {
               createFilterList("#appareilList", recipeService.getAppareilsList(filteredRecipes));
            }

            // el.target = <input> du filtre cliqué
            openDropDown(event.target);

            // recipe.service get.ingredient(null)
         } else {
            closeDropDown(event.target);
         }
      })
   })








   /* Saisie champ recherche filtre */
   inputIngredient.addEventListener("change", (event) => {
      const saisie = event.target.value;
      createFilterList("#ingredientList", recipeService.getIngredientsList(null, saisie));
      // listenListCreateTags();
   })

   /************
   *************     TAG     *******************
   *************/



   /************
   *************     Recherche globale     *******************
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





function createFilterList(nodeFilter, filterList) {
   const nodeFilterUl = document.querySelector(nodeFilter);
   // Supression des listes existantes
   nodeFilterUl.innerHTML = null;
   // Ajout des nouvelles listes
   filterList.forEach((el) => {
      const list = document.createElement("li");
      list.classList.add("itemLiFilter");
      list.innerHTML = el;
      nodeFilterUl.appendChild(list);
      // addEventListener sur chaque liste créee
      list.addEventListener("click", (event) => onSelectTag(event));
   })
}

function onSelectTag(event) {
   const nodeSectionTag = document.querySelector(".sectionTags");
   const tagName = event.target.textContent;
   const nodeContListUl = event.target.parentElement;

   /******* Clic sur liste *******/
   // Depuis <li> cliquée vers <input> de la <li>
   closeDropDown(nodeContListUl.previousElementSibling);

   // Création du tag
   const tagNode = document.createElement("button");
   tagNode.innerHTML = `${tagName}
            <img src="assets/icons/croix.svg" alt="" />`;
            tagNode.classList.add("btnTag");


   if (nodeContListUl.id === "ingredientList") {
      tagNode.classList.add("colorIngredient");
   } else if (nodeContListUl.id === "appareilList") {
      tagNode.classList.add("colorAppareil")
   }

   // object.key <=> array 
   selectedTags[nodeContListUl.id].push(tagName);

   // génération Tag
   nodeSectionTag.appendChild(tagNode);

   console.log(filteredRecipes);
   // Filtre tableau recette avec nom tag
   filterRecipes(event.target);
   console.log(filteredRecipes);
   console.log(selectedTags)

}



// A METTRE DS METHODE
function filterRecipes(nodeLi) {
   if (nodeLi.parentElement.id === "ingredientList") {
      filteredRecipes = filteredRecipes.filter((el) => {
         return el.ingredients.find((el) => {
            return el.ingredient.toLowerCase() === nodeLi.textContent.toLowerCase();
         })
      })
   } else if (nodeLi.parentElement.id === "appareilList") {
      filteredRecipes = filteredRecipes.filter((el) => {
         return el.appliance.toLowerCase() === nodeLi.textContent.toLowerCase();
      })
   }
}







































/************
*************     Ouverture / fermeture menu dropDown     *******************
*************/



// Fermer/ouvrir menu dropdown:
function openDropDown(filterInputNode) {
   // Appararition dropDown avec width 54%, rotation icone 
   filterInputNode.nextElementSibling.classList.add("appear");
   filterInputNode.parentElement.classList.add("widthFilter");
   filterInputNode.previousElementSibling.classList.add("rotate");

   // Modification <input type="text" vers "search" 
   filterInputNode.setAttribute("type", "search");
   filterInputNode.removeAttribute("value");
   // Changement nom placeholder fonction du filtre cliqué
   if (filterInputNode.id === "searchIngredient") {
      filterInputNode.setAttribute("placeholder", "Rechercher un ingredient");
   } else if (filterInputNode.id === "searchAppareil") {
      filterInputNode.setAttribute("placeholder", "Rechercher un appareil");
   }
}
function closeDropDown(filterInputNode) {
   // Disparition dropDown, width réduite, rotation icone 
   filterInputNode.nextElementSibling.classList.remove("appear");
   filterInputNode.parentElement.classList.remove("widthFilter")
   filterInputNode.previousElementSibling.classList.remove("rotate");

   // Modification <input type="search" vers "text" 
   filterInputNode.setAttribute("type", "button");
   filterInputNode.removeAttribute("placeholder");
   // Modification valeur <input> en fonction filtre cliqué
   if (filterInputNode.id === "searchIngredient") {
      filterInputNode.setAttribute("value", "Ingredients")
   } else if (filterInputNode.id === "searchAppareil") {
      filterInputNode.setAttribute("value", "Appareils")
   }
}

/********  Fermeture menu dropDown si ouvert et clic en dehors ********/

const ingredientSearch = document.querySelector("#searchIngredient");
const appareilSearch = document.querySelector("#searchAppareil");

window.addEventListener("click", (event) => {
   /* Si menu dropDown ouvert (widthFilter), si clic en dehors du menu ("ingredientList"), et si clic en dehors bouton filtre (searchIngredient) */
   if ((!(event.target.id === "ingredientList")
      && !(event.target.id === "searchIngredient"))
      && ingredientSearch.parentElement.classList.contains("widthFilter")) {
      closeDropDown(ingredientSearch);
   }
   if ((!(event.target.id === "appareilList")
      && !(event.target.id === "searchAppareil"))
      && appareilSearch.parentElement.classList.contains("widthFilter")) {
      closeDropDown(appareilSearch);
   }
})











/*


function createListWithoutTagName() {
   const nodeTags = document.querySelectorAll(".btnTag");

   // Extraction tableau string liste des recettes filtrées
   const listIngredients = recipeService.getIngredientsList(filteredRecipes);
   const listAppareils = recipeService.getAppareilsList(filteredRecipes);

   // A Modifier
   // Supression du nom des tags de la liste
   nodeTags.forEach(function (el) {
      listIngredients.splice(listIngredients.indexOf(el.innerText), 1);
   })
   nodeTags.forEach(function (el) {
      listAppareils.splice(listAppareils.indexOf(el.innerText), 1);
   })

   // Génère la liste sans le tag
   createFilterList("#ingredientList", listIngredients);
   createFilterList("#appareilList", listAppareils);
}
function filterRecipesWithTag(tag) {
   filteredRecipes = filteredRecipes.filter((el) => {
      return el.ingredients.find((el) => {
         return el.ingredient.toLowerCase() === tag.toLowerCase();
      })
   })
}
*/