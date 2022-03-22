async function init() {

   const recipeService = new RecipeService() ;       

await recipeService.fetchData() ;

document.querySelector("#inputSearch").addEventListener("change", (event) => {

   const filteredRecipes = recipeService.rechercheGlobale(event.target.value)

   console.log(filteredRecipes);

}) ;

}



Init() ;