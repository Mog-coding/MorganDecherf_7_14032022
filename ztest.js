   // Filtre filteredRecipes avec tags non supprimés:
   if (selectedTags["ingredientList"].length > 0)
      selectedTags["ingredientList"].forEach((el) => {
         filteredRecipes = recipeService.filterByTag("ingredientList", el, filteredRecipes)
      })
   if (selectedTags["appareilList"].length > 0)
      selectedTags["appareilList"].forEach((el) => {
         filteredRecipes = recipeService.filterByTag("appareilList", el, filteredRecipes)
      })
   if (selectedTags["ustensilList"].length > 0)
      selectedTags["ustensilList"].forEach((el) => {
         filteredRecipes = recipeService.filterByTag("ustensilList", el, filteredRecipes)
      })


// Filtre tableau de recettes fonction d'un tableau tag
filterByArrayTag(){
        
}

// Filtre tableau de recettes fonction d'un tag
filterByTag(filterType, tagName, filteredRecipes) {
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
    } else if (filterType === "ustensilList") {
        filteredRecipes = filteredRecipes.filter((el) => {
            return el.ustensils.find((el) => {
                return el.toLowerCase() === tagName.toLowerCase();
            })
        })
    }
    return filteredRecipes;
}
