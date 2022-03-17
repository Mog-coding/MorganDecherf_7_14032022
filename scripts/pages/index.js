/* imports */
import RecipeFactory from "../factories/RecipeFactory.js";
import Recipe from "../model/Recipe.js";


/* Récupération des données avec fetch */
fetch("data/recipes.json") // Promise résolue: serveur répond
   .then((response) => {   // Promise résolue: data chargée  
      return response.json();
   })
   .then((response) => { // Promise résolue: retourne data
      const { recipes } = response;
      console.log(recipes); // [{..}, {..},] 50 objets

      // Tableau objets vers instances class Recipe 
      const recipesInst = recipes.map(function (el) {
         const test = new Recipe(el);
         return new RecipeFactory(test)
      })
      // Création dynamiques recettes
      recipesInst.forEach(function (el) {
         const node = document.querySelector(".sectionRecettes");
         node.appendChild(el.createRecipeCards());
      })

      // Fonction de recherche sur propriétés name, ingredients, description 
      function filter() {
         const arrayData = recipes;
         const arrayFiltered = [];
         const saisie = "CiT";
         const saisieLow = saisie.toLowerCase();
         console.log(saisieLow);

         arrayData.forEach(function (objet) {
            const nameLow = objet.name.toLowerCase();
            const descriptionLow = objet.description.toLowerCase();

            if (nameLow.includes(saisieLow)) {
               console.log("name trouvé");
               arrayFiltered.push(objet)
            } else if (descriptionLow.includes(saisieLow)) {
               console.log("description trouvée");
               arrayFiltered.push(objet)
            } else {
               objet.ingredients.forEach((obj) => {
                  // obj = {ingre: "kiwi", quantity:, unit:}
                  const ingredientLow = obj.ingredient.toLowerCase();
                  if (ingredientLow.includes(saisieLow)) {
                     console.log("ingrédient trouvé")
                     arrayFiltered.push(objet)
                  }
               })
            }
         })
         console.log(arrayFiltered);
      }
      filter();


      /*   
      const arrayFiltered = arrayData.filter(function(objet){
            return objet.name.includes(saisie)
      })}
      */









   })