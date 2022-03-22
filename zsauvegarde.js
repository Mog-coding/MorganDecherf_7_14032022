// avec fech .then et function return
async fetchData() {
   return fetch("data/recipes.json")  // Promise résolue: serveur répond
       .then((response) => {        // Promise résolue: data chargée  
           return response.json();
       })
       .then(({ recipes }) => {      // Promise résolue: retourne data
           // console.log(recipes);  [{..}, {..},] 50 instRecipes

           // Retourne tableau d'instances recettes de class Recipe
           const thisRecipe = recipes.map(function (objRecipe) {
               const recipesInst = new Recipe(objRecipe);
               return recipesInst;
           });
           return thisRecipe  // remplacer thisrecipe par this.recipes
       })
}
}
function init(){

   const nodeSectionRecette = document.querySelector(".sectionRecettes");
   const recipeService = new RecipeService();
   // console.log(recipeService);
   recipeService.fetchData().then(function (result) {
      console.log("resultat fetch:")
      console.log(result);
     // console.log(recipeService);
      const nodeSearch = document.querySelector("#inputSearch");
      nodeSearch.addEventListener("change", function (event) {
         console.log(event.target.value);
         const filteredRecipes = recipeService.rechercheGlobale(result, event.target.value);

         // gestion html
         while (nodeSectionRecette.firstChild) {
            nodeSectionRecette.removeChild(nodeSectionRecette.firstChild)
         };
         filteredRecipes.forEach(function(instRecipe){
              const recipeFactory = new RecipeFactory(instRecipe);
              nodeSectionRecette.appendChild(recipeFactory.createRecipeCards());
         })
      })
   }
   )
}

