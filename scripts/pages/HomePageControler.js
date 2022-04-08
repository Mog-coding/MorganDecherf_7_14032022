/* imports */
import RecipeService from "../service/service.js";
import RecipeFactory from "../factories/RecipeFactory.js";

class HomePageControler {

    filteredRecipes = [];

    inputSearch = "";

    selectedTags = {
        ingredientList: [],
        appareilList: [],
        ustensilList: []
    };


    originalRecipes = [];

    nodeSectionRecette = document.querySelector(".sectionRecettes");
    nodeSearch = document.querySelector("#globalSearch");
    recipeService = new RecipeService();

    inputIngredient = document.querySelector("#searchIngredient");

    ingredientSearch = document.querySelector("#searchIngredient");
    appareilSearch = document.querySelector("#searchAppareil");
    ustensilSearch = document.querySelector("#searchUstensil");


    /*** Click sur menu dropDown -> ouvre / ferme ***/
    boutonFilter = document.querySelectorAll(".openDropdown");

    constructor() {
        this.init()

    }

    async init() {
        /* récupération data + ajout propriété recipeService: array 50 instances recette */
        await this.recipeService.fetchData();

        // Initialisation tableau recettes filtrées
        this.filteredRecipes = [...this.recipeService.recipes];

        // Initialisation affichage des recettes
        recipesDisplay(this.filteredRecipes);

        // AM
        this.originalRecipes = [...this.recipeService.recipes];
    }

    //gestion event
    eventHandler() {
        /************
           *************     FILTRES     *******************
           *************/


        /* Listener sur les 3 boutons filtres: 1er clic: ouvre dropDown, 2eme clic: ferme */
        this.boutonFilter.forEach((el) => {
            el.addEventListener("click", (event) => {
                // Si <input> filtre cliqué contient class appear
                if (!event.target.nextElementSibling.classList.contains("appear")) {
                    /* Crée liste ingrédients en fonction du tableau recette filtré et du tag */
                    if (event.target.id === "searchIngredient") {
                        createFilterList("#ingredientList", this.recipeService.getIngredientsList(this.filteredRecipes, this.selectedTags.ingredientList));
                    }
                    else if (event.target.id === "searchAppareil") {
                        createFilterList("#appareilList", this.recipeService.getAppareilsList(this.filteredRecipes, this.selectedTags.appareilList));
                    }
                    else if (event.target.id === "searchUstensil") {
                        createFilterList("#ustensilList", this.recipeService.getUstensilList(this.filteredRecipes, this.selectedTags.ustensilList));
                    }

                    // Ouvre le filtre cliqué, el.target = <input> cliqué
                    this.openDropDown(event.target);

                } else {
                    this.closeDropDown(event.target);
                }
            })
        })


        /* Saisie champ recherche filtre */
        this.inputIngredient.addEventListener("change", (event) => {
            const saisie = event.target.value;
            createFilterList("#ingredientList", this.recipeService.getIngredientsList(null, saisie));

        })
    }

    openDropDown(filterInputNode) {
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
        } else if (filterInputNode.id === "searchUstensil") {
            filterInputNode.setAttribute("placeholder", "Rechercher un ustensile");
        }
    }

    closeDropDown(filterInputNode) {
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
        } else if (filterInputNode.id === "searchUstensil") {
            filterInputNode.setAttribute("value", "Ustensiles")
        }
    }
}

new HomePageControler();