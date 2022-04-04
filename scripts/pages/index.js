/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

let filteredRecipes = [];
let selectedTags = {
   ingredientList: [],
   appareilList: [],
   ustensileList: []
};
//AM
let originalRecipes = [];


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

   // AM
   originalRecipes = [...recipeService.recipes];

   /************
   *************     FILTRES     *******************
   *************/

   const inputIngredient = document.querySelector("#searchIngredient");


   /*** Click sur menu dropDown -> ouvre / ferme ***/
   const boutonFilter = document.querySelectorAll(".openDropdown");

   /* Listener sur les 3 boutons filtres: 1er clic: ouvre dropDown, 2eme clic: ferme */
   boutonFilter.forEach((el) => {
      el.addEventListener("click", (event) => {
         // Si <input> filtre cliqué contient class appear
         if (!event.target.nextElementSibling.classList.contains("appear")) {
            /* Crée liste ingrédients en fonction du tableau recette filtré et du tag */
            if (event.target.id === "searchIngredient") {
               createFilterList("#ingredientList", recipeService.getIngredientsList(filteredRecipes, selectedTags.ingredientList));
            }
            else if (event.target.id === "searchAppareil") {
               createFilterList("#appareilList", recipeService.getAppareilsList(filteredRecipes, selectedTags.appareilList));
            }

            // Ouvre le filtre cliqué, el.target = <input> cliqué
            openDropDown(event.target);

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

   // Si filterList vide
   if (filterList.length === 0) {
      nodeFilterUl.innerHTML = `Aucun filtre disponible`;

   } else {
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
}

function onSelectTag(event) {
   const nodeSectionTag = document.querySelector(".sectionTags");
   const tagName = event.target.textContent;
   const nodeContListUl = event.target.parentElement;

   /******* Clic sur liste *******/
   // Depuis <li> cliquée vers <input> de la <li>
   closeDropDown(nodeContListUl.previousElementSibling);

   /*** Création du tag ***/
   const tagNode = document.createElement("button");
   tagNode.innerHTML = `${tagName}<img src="assets/icons/croix.svg" alt="" />`;
   tagNode.classList.add("btnTag");
   // Ajout data type de tag + couleur
   if (nodeContListUl.id === "ingredientList") {
      tagNode.classList.add("colorIngredient");
      tagNode.setAttribute("data-id", "ingredientList")
   } else if (nodeContListUl.id === "appareilList") {
      tagNode.classList.add("colorAppareil");
      tagNode.setAttribute("data-id", "appareilList")
   }
   // Génération Tag
   nodeSectionTag.appendChild(tagNode);
   // AJOUT LISTENER SUR TAG AVEC FONCTION NOMMEEE
   tagNode.addEventListener("click", (event) => onRemoveTag(event));

   // Object.key <=> array 
   selectedTags[nodeContListUl.id].push(tagName);

   console.log(filteredRecipes);
   // Filtre tableau recette avec nom tag
   filterRecipes(event.target.parentElement.id, event.target.textContent);
   console.log(filteredRecipes);
}


// AM A METTRE DS METHODE
// Filtre du tableau de recettes
function filterRecipes(filterType, tagName) {
   if (filterType === "ingredientList") {
      filteredRecipes = filteredRecipes.filter((objRecipe) => {
         return objRecipe.ingredients.find((el) => {
            return el.ingredient.toLowerCase() === tagName.toLowerCase();
         })
      })
   } else if (filterType === "appareilList") {
      filteredRecipes = filteredRecipes.filter((el) => {
         return el.appliance.toLowerCase() === tagName.toLowerCase();
      })
   } else if (filterType === "ustensileList") {
      filteredRecipes = filteredRecipes.filter((el) => {
         return el.ustensils.find((el) => {
            return el.toLowerCase() === tagName.toLowerCase();
         })
      })
   }
}


// Supprime un tag, filtre le tableau filteredRecipes avec tags restants
function onRemoveTag(event) {

   // Supression nom tag de la liste du filtre
   // idTag -> tag ingredient ou appareil
   const idTag = event.target.dataset.id;
   // Liste des tags cliqués par type
   const arrayTag = selectedTags[idTag];
   // Récupération index du nom du tag 
   const indexTag = arrayTag.indexOf(event.target.textContent);
   // Suppression nom Tag
   arrayTag.splice(indexTag, 1);

   // Supression tag
   event.target.remove();

   // Remise état origine tableau recette
   filteredRecipes = [...originalRecipes];

   // Filtre filteredRecipes avec tags non supprimés:
   if (selectedTags["ingredientList"].length > 0)
      selectedTags["ingredientList"].forEach((el) => {
         filterRecipes("ingredientList", el)
      })
   if (selectedTags["appareilList"].length > 0)
      selectedTags["appareilList"].forEach((el) => {
         filterRecipes("appareilList", el)
      })
   if (selectedTags["ustensileList"].length > 0)
      selectedTags["ustensileList"].forEach((el) => {
         filterRecipes("ustensileList", el)
      })
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